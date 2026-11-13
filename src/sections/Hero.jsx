import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download, Mail, Play } from 'lucide-react';
import { profile } from '../data/profile';
import { SplitWords } from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';
import { GitHubIcon, LinkedInIcon } from '../components/icons';
import { useStory } from '../story/StoryContext';
import { useMotionPref } from '../story/MotionContext';

const profileImages = [
  '/assets/profile.jpg',
  '/assets/profile_old_backup.jpg',
  '/assets/profile2.jpg',
  '/assets/profile3.jpg',
  '/assets/profile4.jpg',
  '/assets/profile5.jpg',
  '/assets/profile6.jpg',
  '/assets/profile7.jpg',
];

const BADGES = [
  { text: 'Computer Vision', pos: '-left-6 top-[10%]', delay: 0 },
  { text: 'Edge AI', pos: '-right-5 top-[28%]', delay: 0.8 },
  { text: 'Generative AI', pos: '-left-6 top-[50%]', delay: 1.6 },
  { text: 'Industrial AI', pos: '-right-5 top-[64%]', delay: 2.4 },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const { play } = useStory();
  const { reduce } = useMotionPref();
  const rolesSequence = profile.subHeadline.split(' | ').flatMap((role) => [role, 2000]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentImageIndex((i) => (i + 1) % profileImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section id="home" ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-24 lg:pb-10">
      {/* legibility + blend into the next section */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- text ---------- */}
          <motion.div style={{ y: textY }} className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-xl"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Open to opportunities</span>
            </motion.div>

            <h1 className="mb-4 font-extrabold tracking-tight text-white">
              <span className="mb-2 block text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold text-slate-300">
                <SplitWords text="Hi, I'm" />
              </span>
              <span className="block text-[clamp(2.75rem,5.6vw,5.25rem)] leading-[1.02] [@media(max-height:760px)]:text-[clamp(2.5rem,4.8vw,4.25rem)]">
                <SplitWords text={profile.name} className="text-gradient" delay={0.25} />
              </span>
            </h1>

            <div className="mb-5 flex h-10 items-center justify-center md:h-12 lg:justify-start">
              {reduce ? (
                <h2 className="text-[clamp(1.25rem,2.1vw,1.875rem)] font-light text-slate-200">{profile.role}</h2>
              ) : (
                <TypeAnimation sequence={rolesSequence} wrapper="h2" speed={50} className="text-[clamp(1.25rem,2.1vw,1.875rem)] font-light text-slate-200" repeat={Infinity} />
              )}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg lg:mx-0"
            >
              {profile.headline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <button
                type="button"
                onClick={play}
                className="group relative flex items-center gap-3 whitespace-nowrap rounded-full bg-primary py-3 pl-3 pr-6 font-bold text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.45)] ring-4 ring-primary/15 transition hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(56,189,248,0.7)]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-950 text-primary"><Play size={13} fill="currentColor" className="ml-0.5" /></span>
                Play my story
              </button>
              <a href="#projects" className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-slate-950/60 px-6 py-3 font-bold text-white backdrop-blur-xl transition hover:border-primary hover:bg-slate-900">
                View work <ArrowRight size={16} />
              </a>
              <a href={`mailto:${profile.social.email}`} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-slate-950/60 px-6 py-3 font-bold text-white backdrop-blur-xl transition hover:border-primary hover:bg-slate-900">
                <Mail size={16} /> Contact
              </a>
            </motion.div>

            {/* one row: label and links share the same line and baseline */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <span className="mr-1 hidden text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 sm:inline">Connect</span>
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3.5 py-2 text-sm text-slate-200 transition hover:border-[#0a66c2] hover:text-[#5aa9ff]">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={profile.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3.5 py-2 text-sm text-slate-200 transition hover:border-white hover:text-white">
                <GitHubIcon /> GitHub
              </a>
              <a href={profile.resume.file} download={profile.resume.name} className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3.5 py-2 text-sm text-slate-200 transition hover:border-primary hover:text-white">
                <Download size={15} /> Resume
              </a>
            </div>
          </motion.div>

          {/* ---------- photo card: sized by the screen height so it always fits ---------- */}
          <motion.div style={{ y: cardY }} className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{ opacity: { duration: 0.8, delay: 0.2 }, scale: { duration: 0.8, delay: 0.2 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              className="relative aspect-[4/5] w-[min(100%,17.5rem)] sm:w-[min(100%,20rem)] lg:w-[min(100%,30rem,calc(min(66svh,40rem)*0.8))]"
            >
              <div className="absolute inset-0 animate-pulse-slow rounded-full bg-gradient-to-tr from-primary to-accent opacity-25 blur-[100px]" />
              <TiltCard className="relative z-10 h-full w-full rounded-[2rem] border border-white/10 bg-slate-950/75 p-3 shadow-2xl backdrop-blur-xl" max={8}>
                <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-slate-900">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9 }}
                    >
                      {/* blurred copy fills the frame; the photo itself is shown whole, centred above the name strip */}
                      <img src={profileImages[currentImageIndex]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
                      <div className="absolute inset-x-0 bottom-[4.5rem] top-0 flex items-center justify-center">
                        <img src={profileImages[currentImageIndex]} alt="Sesan Duraisamy" className="max-h-full max-w-full object-contain" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-slate-950/90 px-4 py-2.5 backdrop-blur-xl">
                    <p className="text-sm font-bold text-white">{profile.name}</p>
                    <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-primary sm:text-[11px] sm:tracking-widest">{profile.roleNote}</p>
                  </div>
                </div>
              </TiltCard>

              {BADGES.map((b) => (
                <motion.span
                  key={b.text}
                  className={`absolute z-20 hidden whitespace-nowrap rounded-full border border-white/15 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-lg backdrop-blur-xl sm:block ${b.pos}`}
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                  {b.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
