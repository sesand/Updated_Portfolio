import { Award, BookOpen, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';
import ChapterHeading from '../components/ui/ChapterHeading';
import { Reveal } from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';

const Achievements = () => (
    <section id="achievements" className="relative py-28">
        <div className="container mx-auto px-6">
            <ChapterHeading number="05" kicker="Recognition" title="Research &" accent="Achievements" />

            {profile.publications?.length > 0 && (
                <div className="mb-20 space-y-6">
                    {profile.publications.map((pub) => (
                        <Reveal key={pub.doi}>
                            <TiltCard max={3} className="rounded-3xl border border-primary/20 bg-slate-950/75 backdrop-blur-xl transition-colors hover:border-primary/50">
                                <a href={pub.link} target="_blank" rel="noreferrer" className="group block p-8 md:p-10">
                                    <div className="mb-5 flex items-center justify-between gap-4">
                                        <span className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                            <BookOpen size={14} /> {pub.venue}
                                        </span>
                                        <ExternalLink size={18} className="shrink-0 text-slate-500 transition-colors group-hover:text-primary" />
                                    </div>
                                    <h3 className="mb-4 max-w-4xl text-xl font-bold text-white transition-colors group-hover:text-primary md:text-2xl">{pub.title}</h3>
                                    <p className="mb-5 max-w-4xl leading-relaxed text-slate-300">{pub.description}</p>
                                    <p className="break-all font-mono text-xs text-slate-500">DOI: {pub.doi}</p>
                                </a>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            )}

            <Reveal>
                <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-white">
                    <Award className="h-5 w-5 text-primary" /> Certifications &amp; Achievements
                </h3>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {profile.achievements.map((item, i) => (
                    <Reveal key={item.title} delay={(i % 5) * 0.07}>
                        <TiltCard max={5} className="group h-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-xl transition-colors hover:border-primary/40">
                            <Award className="mb-4 h-6 w-6 text-primary/70" />
                            <h4 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-primary">{item.title}</h4>
                            <p className="text-sm font-medium text-slate-400">{item.organization}</p>
                            <div className="mt-6 h-1 w-8 bg-primary/30 transition-all duration-500 group-hover:w-full" />
                        </TiltCard>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Achievements;
