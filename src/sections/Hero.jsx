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
  { text: 'Computer Vision', pos: '-left-2 top-10 md:-left-8', delay: 0 },
  { text: 'Edge AI', pos: '-right-2 top-20 md:-right-6', delay: 0.8 },
  { text: 'Generative AI', pos: '-left-2 bottom-36 md:-left-8', delay: 1.6 },
  { text: 'Industrial AI', pos: '-right-2 bottom-28 md:-right-6', delay: 2.4 },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const { play } = useStory();
  const { reduce } = useMotionPref();
  const rolesSequence = profile.subHeadline.split(' | ').flatMap((role) => [role, 2000]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentImageIndex((i) => (i + 1) % profileImages.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section id="home" ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      {/* legibility + blend into the next section */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col-reverse items-center justify-between gap-16 lg:flex-row">
          <motion.div style={{ y: textY }} className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-medium uppercase tracking-wide text-primary">Open to Opportunities</span>
            </motion.div>

            <h1 className="mb-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-white md:text-7xl xl:text-8xl">
              <SplitWords text="Hi, I'm" /> <br />
              <SplitWords text={profile.name} className="text-gradient" delay={0.25} />
            </h1>

            <div className="mb-6 h-12 md:h-16">
              {reduce ? (
                <h2 className="text-2xl font-light text-slate-300 md:text-4xl">{profile.role}</h2>
              ) : (
                <TypeAnimation sequence={rolesSequence} wrapper="h2" speed={50} className="text-2xl font-light text-slate-300 md:text-4xl" repeat={Infinity} />
              )}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-slate-300 md:text-xl lg:mx-0"
            >
              {profile.headline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <button
                type="button"
                onClick={play}
                className="group relative flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-bold text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(56,189,248,0.7)]"
              >
                <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40 [animation-duration:2.6s]" aria-hidden="true" />
                <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-950 text-primary"><Play size={13} fill="currentColor" className="ml-0.5" /></span>
                Play my story
              </button>
              <a href="#projects" className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-950/40 px-8 py-4 font-bold text-white backdrop-blur-xl transition hover:border-primary hover:bg-slate-900">
                View Work <ArrowRight size={16} />
              </a>
              <a href={`mailto:${profile.social.email}`} className="flex items-center gap-2 rounded-full border border-slate-700 px-6 py-4 font-bold text-white transition hover:border-slate-500 hover:bg-slate-900">
                <Mail size={16} /> Contact
              </a>
              <a href={profile.resume.file} download={profile.resume.name} className="flex items-center gap-2 rounded-full border border-slate-700 px-6 py-4 font-bold text-white transition hover:border-slate-500 hover:bg-slate-900">
                <Download size={16} /> Resume
              </a>
            </motion.div>

            <div className="mt-12 flex items-center justify-center gap-6 lg:justify-start">
              <span className="text-sm font-medium uppercase tracking-wider text-slate-400">Connect:</span>
              <div className="flex items-center gap-3">
                <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-slate-300 transition hover:border-[#0077b5] hover:text-[#38b6ff]">
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href={profile.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-slate-300 transition hover:border-white hover:text-white">
                  <GitHubIcon /> GitHub
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: cardY }} className="relative mx-auto w-full max-w-md flex-1 lg:max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -14, 0] }}
              transition={{ opacity: { duration: 0.8, delay: 0.2 }, scale: { duration: 0.8, delay: 0.2 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              className="relative aspect-square w-full"
            >
              <div className="absolute inset-0 animate-pulse-slow rounded-full bg-gradient-to-tr from-primary to-accent opacity-25 blur-[100px]" />
              <TiltCard className="relative z-10 h-full w-full rounded-[2rem] border border-white/10 bg-slate-950/75 p-3 shadow-2xl backdrop-blur-xl md:p-4" max={9}>
                <div className="absolute left-6 top-6 h-14 w-14 rounded-tl-[1.2rem] border-l-2 border-t-2 border-primary/60" />
                <div className="absolute bottom-6 right-6 h-14 w-14 rounded-br-[1.2rem] border-b-2 border-r-2 border-accent/60" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-slate-800">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* blurred copy fills the frame; the photo itself is shown whole, never cropped */}
                      <img src={profileImages[currentImageIndex]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
                      <img src={profileImages[currentImageIndex]} alt="Sesan Duraisamy" className="absolute inset-x-0 top-0 h-[calc(100%-5.5rem)] w-full object-contain" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
                    <p className="text-sm font-bold text-white">{profile.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{profile.roleNote}</p>
                  </div>
                </div>
              </TiltCard>

              {BADGES.map((b) => (
                <motion.span
                  key={b.text}
                  className={`absolute z-20 hidden rounded-full border border-white/15 bg-slate-950/75 px-4 py-2 text-xs font-semibold text-slate-100 shadow-lg backdrop-blur-xl sm:block ${b.pos}`}
                  animate={reduce ? undefined : { y: [0, -9, 0] }}
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

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 transition hover:text-white md:flex">
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-slate-500 pt-1.5">
          <motion.span className="h-1.5 w-1 rounded-full bg-primary" animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </span>
      </a>
    </section>
  );
};

export default Hero;
