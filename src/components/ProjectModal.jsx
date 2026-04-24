import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 px-4 bg-black/50 hover:bg-primary/80 rounded-full text-white transition-colors border border-white/10 font-bold text-xs cursor-pointer">
              CLOSE
            </button>

            <div className="h-64 md:h-80 relative shrink-0">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
               <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-luminosity opacity-70" />
               <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">{project.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 backdrop-blur-md">{t}</span>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-900 flex-1">
              <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">{project.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                 <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 shadow-inner">
                    <h4 className="flex items-center gap-2 font-bold text-white mb-4 uppercase tracking-widest text-xs">Technology Stack</h4>
                    <ul className="space-y-3 text-slate-400">
                      {project.tech.map((t, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm font-medium">
                              <span className="text-primary">▸</span>
                              {t}
                          </li>
                      ))}
                    </ul>
                 </div>
                 <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 shadow-inner">
                    <h4 className="flex items-center gap-2 font-bold text-white mb-4 uppercase tracking-widest text-xs">Project Status</h4>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Production Ready
                    </span>
                 </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-800/50">
                 {project.link && project.link !== "#" && (
                     <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 min-w-[200px] py-4 bg-primary text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 uppercase tracking-widest text-sm">
                        View Project Live
                     </a>
                 )}
                 {(!project.link || project.link === "#") && (
                     <div className="flex-1 min-w-[200px] py-4 bg-slate-800/50 text-slate-500 rounded-xl font-medium flex items-center justify-center gap-2 border border-slate-800 cursor-not-allowed uppercase tracking-widest text-sm">
                        Link Unavailable
                     </div>
                 )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
