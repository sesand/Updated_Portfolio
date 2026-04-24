import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { Rocket, Eye } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-2 mb-12">
                    <Rocket className="text-primary w-6 h-6" />
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Portfolio</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white">
                    Featured <span className="text-gradient">Projects</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profile.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedProject(project)}
                            className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all group shadow-lg cursor-pointer"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-4 py-2 bg-white text-slate-950 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"><Eye size={18} /> Details</span>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-white">{project.title}</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed text-sm line-clamp-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-800 text-xs font-medium text-slate-300 rounded-full border border-slate-700">{t}</span>
                                    ))}
                                </div>
                                <button className="w-full py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-primary transition-all">Learn More</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default Projects;
