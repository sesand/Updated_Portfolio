import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import ChapterHeading from '../components/ui/ChapterHeading';
import TiltCard from '../components/ui/TiltCard';

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
    const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });

    return (
        <section id="experience" className="relative py-28">
            <div className="container mx-auto px-6">
                <ChapterHeading number="02" kicker="Journey" title="Professional" accent="Experience" />

                <div ref={ref} className="relative max-w-4xl">
                    <div className="absolute bottom-0 left-[7px] top-2 w-px bg-slate-800" aria-hidden="true" />
                    <motion.div
                        style={{ scaleY: line }}
                        className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_14px_#38bdf8]"
                        aria-hidden="true"
                    />

                    <div className="space-y-10">
                        {profile.experience.map((exp) => {
                            const current = /present/i.test(exp.period);
                            return (
                                <motion.article
                                    key={`${exp.company}-${exp.period}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative pl-10"
                                >
                                    <motion.span
                                        className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-2 border-primary bg-slate-950"
                                        initial={{ scale: 0.4, boxShadow: '0 0 0 rgba(56,189,248,0)' }}
                                        whileInView={{ scale: 1, boxShadow: '0 0 16px rgba(56,189,248,0.9)' }}
                                        viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 14 }}
                                    />
                                    <TiltCard max={4} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-colors hover:border-primary/40 md:p-8">
                                        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                                {exp.roleNote && (
                                                    <span className="mt-2 inline-block rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{exp.roleNote}</span>
                                                )}
                                            </div>
                                            <span className={`self-start whitespace-nowrap rounded-full border px-4 py-1 text-xs font-bold ${current ? 'border-primary/50 bg-primary/10 text-primary' : 'border-slate-700 bg-slate-800 text-slate-300'}`}>
                                                {current && <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary align-middle" />}
                                                {exp.period}
                                            </span>
                                        </div>

                                        <h4 className="mb-4 text-lg font-medium text-secondary">{exp.company}</h4>
                                        <p className="mb-4 leading-relaxed text-slate-300">{exp.description}</p>

                                        {exp.highlights?.length > 0 && (
                                            <ul className="mb-6 space-y-3">
                                                {exp.highlights.map((point) => (
                                                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-400 md:text-base">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden="true" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {exp.tech?.length > 0 && (
                                            <div className="mb-6 flex flex-wrap gap-2">
                                                {exp.tech.map((t) => (
                                                    <span key={t} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{t}</span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-sm italic text-slate-500">
                                            <MapPin size={14} /> {exp.location}
                                        </div>
                                    </TiltCard>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
