import { profile } from '../data/profile';
import ChapterHeading from '../components/ui/ChapterHeading';
import { Reveal } from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';
import Marquee from '../components/ui/Marquee';

const half = Math.ceil(profile.skills.length / 2);
const rowA = profile.skills.slice(0, half);
const rowB = profile.skills.slice(half);

const Chip = ({ skill }) => (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/75 px-6 py-4 backdrop-blur-xl transition-colors hover:border-primary/50">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white p-2.5 shadow-inner">
            <img src={skill.iconUrl} alt="" loading="lazy" className="h-full w-full object-contain" />
        </span>
        <span className="whitespace-nowrap text-sm font-bold text-slate-100">{skill.name}</span>
    </div>
);

const Skills = () => (
    <section id="skills" className="relative overflow-hidden py-28">
        <div className="container mx-auto px-6">
            <ChapterHeading number="03" kicker="Tech Stack" title="Expertise &" accent="Tools" />
        </div>

        <Reveal className="space-y-4">
            <Marquee speed={46}>{rowA.map((s) => <Chip key={s.name} skill={s} />)}</Marquee>
            <Marquee speed={52} reverse>{rowB.map((s) => <Chip key={s.name} skill={s} />)}</Marquee>
        </Reveal>

        <div className="container mx-auto mt-24 px-6">
            <Reveal>
                <h3 className="mb-10 text-2xl font-bold text-white">
                    Full <span className="text-gradient">skill set</span>
                </h3>
            </Reveal>
            <div className="gap-6 md:columns-2 [&>*]:mb-6 [&>*]:break-inside-avoid">
                {profile.skillGroups.map((group, i) => (
                    <Reveal key={group.title} delay={(i % 2) * 0.1}>
                        <TiltCard max={4} className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-xl transition-colors hover:border-primary/30">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">{group.title}</h4>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span key={item} className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300">{item}</span>
                                ))}
                            </div>
                        </TiltCard>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Skills;
