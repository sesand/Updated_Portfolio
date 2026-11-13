import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import { profile } from './data/profile';

import Particles from './components/Particles';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-primary/30 selection:text-white relative overflow-x-clip">
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center flex flex-col items-center justify-center gap-4">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-slate-600 text-xs">{profile.role} Portfolio</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
