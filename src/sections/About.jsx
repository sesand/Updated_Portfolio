import { GraduationCap, Languages, Cpu } from 'lucide-react';
import { profile } from '../data/profile';
import ChapterHeading from '../components/ui/ChapterHeading';
import { Reveal } from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';
import CountUp from '../components/CountUp';

// Every number here is real: years come from the resume, the rest are counted from profile.js.
const stats = [
    { value: 2, suffix: '+', label: 'Years building AI' },
    { value: profile.projects.length, suffix: '', label: 'Projects shipped' },
    { value: profile.experience.length, suffix: '', label: 'Roles held' },
    { value: profile.publications.length, suffix: '', label: 'Springer paper' },
];

const About = () => (
    <section id="about" className="relative py-28">
        <div className="container mx-auto px-6">
            <ChapterHeading number="01" kicker="About" title="Who" accent="I am" />

            <div className="mb-24 grid items-start gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-7 shadow-2xl backdrop-blur-xl md:p-10">
                        <p className="text-lg leading-relaxed text-slate-200 md:text-xl">{profile.about}</p>
                    </div>
                </Reveal>
                <div className="grid grid-cols-2 gap-4 lg:col-span-5">
                    {stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.08}>
                            <TiltCard className="h-full rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-xl">
                                <div className="text-gradient text-5xl font-extrabold tracking-tight">
                                    <CountUp to={s.value} suffix={s.suffix} />
                                </div>
                                <p className="mt-2 text-sm text-slate-300">{s.label}</p>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>

            <Reveal>
                <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-white">
                    <Cpu className="h-5 w-5 text-primary" /> Core Expertise
                </h3>
            </Reveal>
            <div className="mb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {profile.coreExpertise.map((item, i) => (
                    <Reveal key={item.title} delay={(i % 3) * 0.08}>
                        <TiltCard className="h-full rounded-2xl border border-white/10 bg-slate-950/75 p-7 backdrop-blur-xl transition-colors hover:border-primary/40">
                            <span className="font-mono text-xs text-primary/70">{String(i + 1).padStart(2, '0')}</span>
                            <h4 className="mb-3 mt-2 text-lg font-bold text-white">{item.title}</h4>
                            <p className="text-sm leading-relaxed text-slate-300">{item.text}</p>
                        </TiltCard>
                    </Reveal>
                ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
                <div className="min-w-0 lg:col-span-2">
                    <Reveal>
                        <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-white">
                            <GraduationCap className="h-5 w-5 text-primary" /> Education
                        </h3>
                    </Reveal>
                    <div className="space-y-5">
                        {profile.education.map((edu, i) => (
                            <Reveal key={edu.degree} delay={i * 0.1}>
                                <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-xl transition-colors hover:border-primary/30">
                                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                                        <span className="self-start rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-primary">{edu.period}</span>
                                    </div>
                                    <p className="font-medium text-secondary">{edu.school}</p>
                                    <p className="mt-1 text-sm text-slate-300">{edu.score}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <div className="min-w-0">
                    <Reveal>
                        <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-white">
                            <Languages className="h-5 w-5 text-primary" /> Languages
                        </h3>
                    </Reveal>
                    <div className="space-y-4">
                        {profile.languages.map((lang, i) => (
                            <Reveal key={lang.name} delay={i * 0.1}>
                                <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-xl">
                                    <h4 className="text-lg font-bold text-white">{lang.name}</h4>
                                    <p className="text-sm text-slate-300">{lang.level}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default About;
