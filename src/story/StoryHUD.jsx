import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward, X, Activity } from 'lucide-react';
import { useStory } from './StoryContext';
import { useMotionPref } from './MotionContext';

const ease = [0.16, 1, 0.3, 1];

/** Thin gradient bar at the very top: how far through the page you are. */
function ProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
    return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-accent" style={{ scaleX }} />;
}

/** Right-hand chapter navigator (desktop). */
function ChapterRail() {
    const { chapters, active, goTo } = useStory();
    return (
        <nav aria-label="Chapters" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
            <ol className="flex flex-col items-end gap-3">
                {chapters.map((c, i) => {
                    const on = i === active;
                    return (
                        <li key={c.id}>
                            <button
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to ${c.label}`}
                                aria-current={on ? 'true' : undefined}
                                className="group flex items-center gap-3"
                            >
                                <span className={`text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 ${on ? 'translate-x-0 text-primary opacity-100' : 'translate-x-2 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
                                    {c.label}
                                </span>
                                <span className={`block rounded-full transition-all duration-300 ${on ? 'h-6 w-1.5 bg-primary shadow-[0_0_12px_#38bdf8]' : 'h-1.5 w-1.5 bg-slate-600 group-hover:bg-slate-300'}`} />
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

/** Cinematic letterbox + captions + controls, shown while the story is playing or paused. */
function StoryBar() {
    const { chapters, active, mode, pause, resume, stop, next, prev } = useStory();
    const on = mode !== 'off';
    const playing = mode === 'playing';
    const btn = 'grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-primary hover:bg-primary/15 disabled:opacity-30';

    return (
        <AnimatePresence>
            {on && (
                <>
                    <motion.div aria-hidden="true" key="top" className="pointer-events-none fixed inset-x-0 top-0 z-[60] bg-black" initial={{ height: 0 }} animate={{ height: 34 }} exit={{ height: 0 }} transition={{ duration: 0.7, ease }} />
                    <motion.div
                        key="bottom"
                        data-story-ui
                        className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-3 bg-gradient-to-t from-black via-black/90 to-black/0 px-4 pb-4 pt-14"
                        initial={{ y: 120, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 120, opacity: 0 }}
                        transition={{ duration: 0.7, ease }}
                        role="region"
                        aria-label="Story player"
                    >
                        <div className="relative h-10 w-full max-w-3xl text-center" aria-live="polite">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={active}
                                    className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white sm:text-base"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {chapters[active].caption}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-4">
                            <button type="button" className={btn} onClick={prev} disabled={active === 0} aria-label="Previous chapter"><SkipBack size={16} /></button>
                            <button
                                type="button"
                                className="grid h-12 w-12 place-items-center rounded-full bg-primary text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.55)] transition hover:scale-105"
                                onClick={playing ? pause : resume}
                                aria-label={playing ? 'Pause story' : 'Play story'}
                            >
                                {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                            </button>
                            <button type="button" className={btn} onClick={next} disabled={active === chapters.length - 1} aria-label="Next chapter"><SkipForward size={16} /></button>
                            <button type="button" className={`${btn} ml-2`} onClick={stop} aria-label="Close story"><X size={16} /></button>
                        </div>

                        <div className="flex items-center gap-2" aria-hidden="true">
                            {chapters.map((c, i) => (
                                <span key={c.id} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-primary' : i < active ? 'w-3 bg-primary/50' : 'w-3 bg-white/20'}`} />
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/** Small on/off switch for animation, 3D and video. Lives in the navbar. */
export function MotionToggle({ className = '' }) {
    const { reduce, setOverride } = useMotionPref();
    const label = reduce ? 'Animations are off. Turn them on' : 'Animations are on. Turn them off';
    return (
        <button
            type="button"
            onClick={() => setOverride(reduce ? 'on' : 'off')}
            role="switch"
            aria-checked={!reduce}
            aria-label={label}
            title={label}
            className={`flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 py-1.5 pl-2 pr-3 text-xs font-semibold text-slate-300 transition hover:border-primary hover:text-white ${className}`}
        >
            <span className={`relative h-4 w-7 rounded-full transition-colors ${reduce ? 'bg-slate-700' : 'bg-primary'}`} aria-hidden="true">
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${reduce ? 'left-0.5' : 'left-3.5'}`} />
            </span>
            <Activity size={13} className={reduce ? 'text-slate-500' : 'text-primary'} aria-hidden="true" />
            Motion
        </button>
    );
}

export default function StoryHUD() {
    return (
        <>
            <ProgressBar />
            <ChapterRail />
            <StoryBar />
        </>
    );
}
