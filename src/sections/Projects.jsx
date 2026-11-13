import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import ProjectModal from '../components/ProjectModal';
import ChapterHeading from '../components/ui/ChapterHeading';
import { Reveal } from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';
import { useMotionPref } from '../story/MotionContext';

const useMediaQuery = (query) =>
    useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia(query);
            mq.addEventListener('change', cb);
            return () => mq.removeEventListener('change', cb);
        },
        () => window.matchMedia(query).matches,
        () => false
    );

const total = profile.projects.length;

const Card = ({ project, index, onOpen, className = '' }) => (
    <TiltCard
        max={5}
        onClick={() => onOpen(project)}
        className={`group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-xl backdrop-blur-xl transition-colors hover:border-primary/50 ${className}`}
    >
        <div className="relative h-48 shrink-0 overflow-hidden md:h-52">
            <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 font-mono text-xs text-slate-200 backdrop-blur-xl">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-primary">{project.title}</h3>
            <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
            <div className="mt-auto flex h-[1.75rem] flex-wrap gap-2 overflow-hidden">
                {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">{t}</span>
                ))}
                {project.tech.length > 3 && <span className="shrink-0 rounded-full px-2 py-1 text-xs text-slate-400">+{project.tech.length - 3}</span>}
            </div>
            <span className="mt-5 flex items-center gap-1 text-sm font-bold text-primary opacity-80 transition group-hover:gap-2 group-hover:opacity-100">
                View details <ArrowUpRight size={16} />
            </span>
        </div>
    </TiltCard>
);

/** Desktop: the section pins to the screen and the cards slide sideways as you scroll down. */
function PinnedGallery({ onOpen }) {
    const outer = useRef(null);
    const track = useRef(null);
    const [dist, setDist] = useState(0);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth + 96));
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
    const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
    const x = useTransform(smooth, [0, 1], [0, -dist]);
    useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrent(Math.min(total, Math.max(1, Math.round(v * (total - 1)) + 1))));

    return (
        <div ref={outer} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <div className="container mx-auto px-6">
                    <ChapterHeading number="04" kicker="Portfolio" title="Featured" accent="Projects" />
                </div>
                <motion.div ref={track} style={{ x }} className="flex w-max gap-8 pl-6 pr-24 will-change-transform md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
                    {profile.projects.map((p, i) => (
                        <Card key={p.title} project={p} index={i} onOpen={onOpen} className="h-[29rem] w-[24rem] shrink-0" />
                    ))}
                </motion.div>
                <div className="container mx-auto mt-10 flex items-center gap-6 px-6" aria-hidden="true">
                    <span className="font-mono text-sm text-slate-300">{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                    <div className="h-px flex-1 bg-slate-800">
                        <motion.div style={{ scaleX: smooth }} className="h-px origin-left bg-gradient-to-r from-primary to-accent" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Scroll</span>
                </div>
            </div>
        </div>
    );
}

/** Phones, tablets and Motion off: a normal responsive grid. */
function GridGallery({ onOpen }) {
    return (
        <div className="container mx-auto px-6">
            <ChapterHeading number="04" kicker="Portfolio" title="Featured" accent="Projects" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {profile.projects.map((p, i) => (
                    <Reveal key={p.title} delay={(i % 3) * 0.08}>
                        <Card project={p} index={i} onOpen={onOpen} className="h-full" />
                    </Reveal>
                ))}
            </div>
        </div>
    );
}

const Projects = () => {
    const [selected, setSelected] = useState(null);
    const { reduce } = useMotionPref();
    const wide = useMediaQuery('(min-width: 1024px) and (pointer: fine)');
    const pinned = wide && !reduce;

    return (
        <section id="projects" className={pinned ? 'relative' : 'relative py-28'}>
            {pinned ? <PinnedGallery onOpen={setSelected} /> : <GridGallery onOpen={setSelected} />}
            <ProjectModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
        </section>
    );
};

export default Projects;
