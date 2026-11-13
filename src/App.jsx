import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Particles from './components/Particles';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';
import { profile } from './data/profile';
import { MotionProvider, useMotionPref } from './story/MotionContext';
import { StoryProvider, useStory } from './story/StoryContext';
import { canPlayVideo, graphicsTier } from './story/capabilities';
import ScrollVideo from './story/ScrollVideo';
import StoryHUD from './story/StoryHUD';

// three.js is heavy: load it only when the device can actually render the 3D world.
const World = lazy(() => import('./story/World'));

function Backdrop() {
  const { reduce } = useMotionPref();
  const { progress, activeRef } = useStory();
  const tier = graphicsTier(reduce);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {canPlayVideo(reduce) ? (
        <ScrollVideo />
      ) : (
        <img src="/assets/video/neural-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" />
      )}
      {tier === 'off' ? (
        <Particles />
      ) : (
        <Suspense fallback={<Particles />}>
          <World progressRef={progress} activeRef={activeRef} tier={tier} />
        </Suspense>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.75)_100%)]" />
    </div>
  );
}

function Site() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-200 selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      <Backdrop />
      <StoryHUD />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <footer className="flex flex-col items-center gap-3 border-t border-slate-900 bg-slate-950/80 py-10 text-center backdrop-blur">
          <Logo size={40} animate={false} />
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <StoryProvider>
        <Site />
      </StoryProvider>
    </MotionProvider>
  );
}
