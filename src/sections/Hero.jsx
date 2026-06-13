import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { profile } from '../data/profile';
import Particles from '../components/Particles';

const Hero = () => {
  const rolesSequence = profile.subHeadline.split(' | ').flatMap(role => [role, 2000]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950 z-10"></div>
        <img src="/assets/hero-bg.png" alt="AI Background" className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-medium text-sm tracking-wide uppercase">Open to Opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              Hi, I'm <br />
              <span className="text-gradient inline-block">{profile.name}</span>
            </h1>
            
            <div className="h-12 md:h-16 mb-6">
              <TypeAnimation
                sequence={rolesSequence}
                wrapper="h2"
                speed={50}
                className="text-2xl md:text-4xl text-slate-300 font-light"
                repeat={Infinity}
              />
            </div>
            
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 mx-auto lg:mx-0 leading-relaxed font-light">
              {profile.headline}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
              <a href="#projects" className="px-8 py-4 bg-primary text-slate-950 rounded-full font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm">
                View Work →
              </a>
              <a href={`mailto:${profile.social.email}`} className="px-8 py-4 bg-transparent text-white rounded-full font-bold flex items-center gap-2 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 uppercase tracking-widest text-sm">
                Contact Me
              </a>
              <a href="/assets/AI_Engineer_SesanD_062026.docx" download="AI_Engineer_SesanD_062026.docx" className="px-8 py-4 bg-transparent text-white rounded-full font-bold flex items-center gap-2 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 uppercase tracking-widest text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Resume
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
                <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Connect:</span>
                <div className="flex items-center gap-4">
                    <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-400 hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all font-bold text-xs uppercase tracking-tighter shadow-lg hover:-translate-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn
                    </a>
                    <a href={profile.social.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-400 hover:text-white hover:border-white/50 transition-all font-bold text-xs uppercase tracking-tighter shadow-lg hover:-translate-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                    </a>
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="flex-1 relative w-full max-w-lg mx-auto"
          >
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-[100px] animate-pulse-slow"></div>
              
              <div className="relative z-10 w-full h-full p-2 md:p-6">
                <div className="w-full h-full rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-2 md:p-4 shadow-2xl relative overflow-hidden group transform hover:scale-[1.02] transition-transform duration-500">
                    
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/50 rounded-tl-[1.5rem] m-6 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent/50 rounded-br-[1.5rem] m-6 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="w-full h-full rounded-[1.2rem] overflow-hidden relative bg-slate-800">
                        {/* Personal Profile Image Slideshow */}
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={currentImageIndex}
                                src={profileImages[currentImageIndex]} 
                                alt="Sesan Duraisamy" 
                                className="w-full h-full object-cover absolute inset-0"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 0.9, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between z-20">
                            <div>
                                <p className="text-white font-bold text-sm">Sesan Duraisamy</p>
                                <p className="text-primary text-xs uppercase tracking-widest font-bold">AI Specialist</p>
                            </div>
                        </div>
                    </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
