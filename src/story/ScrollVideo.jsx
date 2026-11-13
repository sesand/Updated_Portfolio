import { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform, useVelocity } from 'framer-motion';
import { useStory } from './StoryContext';

// Colour grade per chapter (home, about, experience, skills, projects, achievements, contact).
const GRADE = ['0deg', '25deg', '55deg', '-20deg', '35deg', '70deg', '0deg'];

/**
 * Full-page background video that keeps playing from the top of the page to the end.
 * - It zooms slowly and dims as you scroll down (brightest in the intro).
 * - It plays faster while you scroll, and settles back to normal speed when you stop.
 * - Its colour shifts with each chapter of the story.
 * - It pauses when the tab is hidden.
 */
export default function ScrollVideo() {
    const ref = useRef(null);
    const { active } = useStory();
    const { scrollY, scrollYProgress } = useScroll();
    const velocity = useVelocity(scrollY);
    // bright in the intro, then dimmed so text on top stays easy to read
    const opacity = useTransform(scrollYProgress, [0, 0.06, 0.12, 0.92, 1], [0.9, 0.45, 0.24, 0.24, 0.4]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

    // scroll speed -> playback speed (1x at rest, up to 3x while scrolling fast)
    useMotionValueEvent(velocity, 'change', (v) => {
        const el = ref.current;
        if (!el) return;
        const rate = Math.min(3, 1 + Math.abs(v) / 1200);
        el.playbackRate += (rate - el.playbackRate) * 0.25;
    });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // ease playback back to 1x when scrolling stops
        const id = setInterval(() => {
            if (el.playbackRate > 1.01) el.playbackRate = Math.max(1, el.playbackRate * 0.9);
        }, 120);
        const vis = () => (document.hidden ? el.pause() : el.play().catch(() => {}));
        document.addEventListener('visibilitychange', vis);
        el.play().catch(() => {});
        return () => {
            clearInterval(id);
            document.removeEventListener('visibilitychange', vis);
        };
    }, []);

    return (
        <motion.div style={{ opacity, scale, y }} className="absolute inset-0 will-change-transform" aria-hidden="true">
            <video
                ref={ref}
                className="h-full w-full object-cover mix-blend-screen transition-[filter] duration-1000"
                style={{ filter: `hue-rotate(${GRADE[active] ?? '0deg'}) saturate(1.15)` }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/assets/video/neural-poster.jpg"
                disablePictureInPicture
            >
                <source src="/assets/video/neural-loop.mp4" type="video/mp4" />
            </video>
        </motion.div>
    );
}
