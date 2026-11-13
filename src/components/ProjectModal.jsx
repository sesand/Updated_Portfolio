import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

/**
 * Project details. The whole card scrolls as one (picture, description, stack, link), so there is always
 * plenty of room to read. It has a visible scrollbar, a "scroll for more" hint, and closes with Esc or a click outside.
 */
const ProjectModal = ({ project, isOpen, onClose }) => {
  const scroller = useRef(null);
  const [canScrollMore, setCanScrollMore] = useState(true);

  const update = () => {
    const el = scroller.current;
    if (el) setCanScrollMore(el.scrollTop + el.clientHeight < el.scrollHeight - 24);
  };

  // Escape closes; the page behind stays put while the card is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // measure once the card has rendered (it is mounted by AnimatePresence, so wait a frame)
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      if (scroller.current) scroller.current.scrollTop = 0;
      update();
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen, project]);

  if (!project) return null;

  // portal to <body>: inside the page's stacking context the card would sit under the navbar and chapter rail
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={project.title}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-3 top-3 z-30 flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-bold text-white backdrop-blur transition-colors hover:bg-primary hover:text-slate-950"
            >
              <X size={14} /> CLOSE
            </button>

            {/* data-lenis-prevent: the page's smooth-scroll must not swallow the mouse wheel in here */}
            <div
              ref={scroller}
              data-lenis-prevent
              onScroll={update}
              className="modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain"
              tabIndex={0}
            >
              <div className="relative flex min-h-[13rem] shrink-0 items-end sm:min-h-[16rem]">
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="relative w-full p-6 pt-20 sm:p-8 sm:pt-16">
                  <h2 className="mb-4 text-2xl font-black tracking-tight text-white drop-shadow-lg sm:text-4xl">{project.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-full border border-primary/25 bg-slate-950/70 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="mb-8 text-base leading-relaxed text-slate-200 sm:text-lg">{project.description}</p>

                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-6">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Technology Stack</h4>
                    <ul className="space-y-3 text-slate-300">
                      {project.tech.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm font-medium">
                          <span className="text-primary">▸</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-6">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Project Status</h4>
                    <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                      Production Ready
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 border-t border-white/10 pt-6">
                  {project.link && project.link !== '#' ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex min-w-[200px] flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-white">
                      View Project Live
                    </a>
                  ) : (
                    <div className="flex min-w-[200px] flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 py-4 text-sm font-medium uppercase tracking-widest text-slate-500">
                      Link Unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* "more below" hint: disappears once you have scrolled to the end */}
            <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-16 items-end justify-center bg-gradient-to-t from-slate-950 to-transparent pb-2 transition-opacity duration-300 ${canScrollMore ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
              <span className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-300">
                Scroll for more <ChevronDown size={14} className="animate-bounce" />
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
