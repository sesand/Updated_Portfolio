import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { chapters } from './chapters';
import { useMotionPref } from './MotionContext';

const StoryContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useStory = () => useContext(StoryContext);

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const linear = (t) => t;

const sectionTop = (el) => Math.round(el.getBoundingClientRect().top + window.scrollY);
const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Smooth scrolling, scroll progress for the 3D scene, the active chapter, and the "story player"
 * that auto-scrolls through the chapters like a video.
 */
export function StoryProvider({ children }) {
    const { reduce } = useMotionPref();

    const progress = useRef(0); // 0..1 over the whole page; read every frame by the 3D scene
    const activeRef = useRef(0);
    const lenis = useRef(null);
    const modeRef = useRef('off');
    const player = useRef({ segs: [], i: 0, t: 0 });

    const [active, setActive] = useState(0);
    const [mode, setModeState] = useState('off'); // 'off' | 'playing' | 'paused'

    const setMode = useCallback((m) => {
        modeRef.current = m;
        setModeState(m);
    }, []);

    /* ---- scrolling primitives ---- */
    const jumpTo = useCallback((y) => {
        if (lenis.current) lenis.current.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo(0, y);
    }, []);

    const glideTo = useCallback((y, duration = 1.5) => {
        if (lenis.current) lenis.current.scrollTo(y, { duration, easing: easeInOut });
        else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }, [reduce]);

    const chapterY = useCallback((i) => {
        const el = document.getElementById(chapters[clamp(i, 0, chapters.length - 1)].id);
        return el ? Math.min(sectionTop(el), Math.max(0, maxScroll())) : 0;
    }, []);

    /* ---- story player ---- */
    const buildSegments = useCallback((startChapter, fromY) => {
        const segs = [];
        let y = fromY;
        const max = Math.max(0, maxScroll());
        for (let i = startChapter; i < chapters.length; i++) {
            const el = document.getElementById(chapters[i].id);
            if (!el) continue;
            const top = Math.min(sectionTop(el), max);
            const dist = Math.abs(top - y);
            if (dist > 8) segs.push({ from: y, to: top, dur: clamp(dist / 1300, 0.9, 2.4), ease: easeInOut });
            // tall sections (e.g. the horizontal project gallery) are panned slowly, short ones are held still
            const endY = Math.min(top + el.offsetHeight - window.innerHeight, max);
            const pans = endY - top > 40;
            segs.push({ from: top, to: pans ? endY : top, dur: chapters[i].hold, ease: pans ? linear : linear });
            y = pans ? endY : top;
        }
        return segs;
    }, []);

    const startFrom = useCallback((chapterIndex) => {
        player.current = { segs: buildSegments(chapterIndex, window.scrollY), i: 0, t: 0 };
        setMode('playing');
    }, [buildSegments, setMode]);

    const play = useCallback(() => {
        const atEnd = window.scrollY >= maxScroll() - 40;
        startFrom(atEnd ? 0 : activeRef.current);
    }, [startFrom]);

    const pause = useCallback(() => {
        if (modeRef.current === 'playing') setMode('paused');
    }, [setMode]);

    const resume = useCallback(() => startFrom(activeRef.current), [startFrom]);
    const stop = useCallback(() => setMode('off'), [setMode]);

    const goTo = useCallback((i) => {
        const idx = clamp(i, 0, chapters.length - 1);
        if (modeRef.current === 'playing') startFrom(idx);
        else glideTo(chapterY(idx));
    }, [chapterY, glideTo, startFrom]);

    const next = useCallback(() => goTo(activeRef.current + 1), [goTo]);
    const prev = useCallback(() => goTo(activeRef.current - 1), [goTo]);

    const goToId = useCallback((id) => {
        const i = chapters.findIndex((c) => c.id === id);
        if (i >= 0) {
            if (modeRef.current !== 'off') setMode('off');
            glideTo(chapterY(i));
            return true;
        }
        const el = document.getElementById(id);
        if (el) {
            glideTo(sectionTop(el));
            return true;
        }
        return false;
    }, [chapterY, glideTo, setMode]);

    /* ---- smooth scroll + progress + active chapter + anchor links ---- */
    useEffect(() => {
        let raf = 0;
        let instance = null;
        if (!reduce) {
            instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
            lenis.current = instance;
            const loop = (time) => {
                instance.raf(time);
                raf = requestAnimationFrame(loop);
            };
            raf = requestAnimationFrame(loop);
        }

        const onScroll = () => {
            const max = maxScroll();
            progress.current = max > 0 ? clamp(window.scrollY / max) : 0;
            const probe = window.scrollY + window.innerHeight * 0.45;
            let idx = 0;
            for (let i = 0; i < chapters.length; i++) {
                const el = document.getElementById(chapters[i].id);
                if (el && sectionTop(el) <= probe) idx = i;
            }
            if (idx !== activeRef.current) {
                activeRef.current = idx;
                setActive(idx);
            }
        };

        const onClick = (e) => {
            const a = e.target.closest?.('a[href^="#"]');
            if (!a) return;
            const id = a.getAttribute('href').slice(1);
            if (id && goToId(id)) e.preventDefault();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        document.addEventListener('click', onClick);
        const first = requestAnimationFrame(onScroll);

        return () => {
            cancelAnimationFrame(raf);
            cancelAnimationFrame(first);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            document.removeEventListener('click', onClick);
            instance?.destroy();
            lenis.current = null;
        };
    }, [reduce, goToId]);

    /* ---- the player loop: only does work while playing ---- */
    useEffect(() => {
        let raf = 0;
        let last = performance.now();
        const tick = (now) => {
            raf = requestAnimationFrame(tick);
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            if (modeRef.current !== 'playing') return;
            const p = player.current;
            const seg = p.segs[p.i];
            if (!seg) {
                setMode('off');
                return;
            }
            p.t += dt;
            const k = clamp(p.t / seg.dur);
            jumpTo(seg.from + (seg.to - seg.from) * seg.ease(k));
            if (k >= 1) {
                p.i += 1;
                p.t = 0;
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [jumpTo, setMode]);

    /* ---- the visitor takes over: any manual scroll/touch/navigation key pauses the story ---- */
    useEffect(() => {
        const interrupt = (e) => {
            if (modeRef.current !== 'playing') return;
            if (e.target?.closest?.('[data-story-ui]')) return;
            if (e.type === 'keydown' && !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) return;
            setMode('paused');
        };
        const keys = (e) => {
            if (e.key === 'Escape' && modeRef.current !== 'off') setMode('off');
            if (e.key === ' ' && modeRef.current !== 'off' && !/input|textarea|select|button|a/i.test(e.target?.tagName || '')) {
                e.preventDefault();
                if (modeRef.current === 'playing') setMode('paused');
                else startFrom(activeRef.current);
            }
        };
        const opts = { passive: true };
        window.addEventListener('wheel', interrupt, opts);
        window.addEventListener('touchstart', interrupt, opts);
        window.addEventListener('keydown', interrupt);
        window.addEventListener('keydown', keys);
        return () => {
            window.removeEventListener('wheel', interrupt, opts);
            window.removeEventListener('touchstart', interrupt, opts);
            window.removeEventListener('keydown', interrupt);
            window.removeEventListener('keydown', keys);
        };
    }, [setMode, startFrom]);

    const value = useMemo(
        () => ({ progress, activeRef, active, mode, chapters, play, pause, resume, stop, next, prev, goTo, goToId }),
        [active, mode, play, pause, resume, stop, next, prev, goTo, goToId]
    );

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}
