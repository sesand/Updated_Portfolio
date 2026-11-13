import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SplitWords, Reveal } from './Reveal';

/** Section opener: a giant outlined chapter number that drifts with scroll, a kicker and a word-reveal title. */
export default function ChapterHeading({ number, kicker, title, accent, intro }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const x = useTransform(scrollYProgress, [0, 1], [10, -50]);

    return (
        <header ref={ref} className="relative mb-14 md:mb-20">
            <motion.span aria-hidden="true" style={{ x }} className="outline-text pointer-events-none absolute -top-6 right-0 select-none text-[6rem] font-black leading-none opacity-50 md:-top-12 md:text-[11rem]">
                {number}
            </motion.span>
            <div className="relative pt-10 md:pt-16">
                <Reveal>
                    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                        <span className="h-px w-10 bg-secondary/60" />
                        {kicker}
                    </p>
                </Reveal>
                <h2 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
                    <SplitWords text={title} />{' '}
                    {accent && <SplitWords text={accent} className="text-gradient" delay={0.15} />}
                </h2>
                {intro && (
                    <Reveal delay={0.2}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{intro}</p>
                    </Reveal>
                )}
            </div>
        </header>
    );
}
