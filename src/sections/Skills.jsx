import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-slate-900/30 relative">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl z-0 pointer-events-none"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-center gap-2 mb-12">
                    <span className="text-primary font-mono text-xl">#</span>
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Tech Stack</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold mb-16 text-white tracking-tight">
                    Expertise & <span className="text-gradient">Tools</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {profile.skills.map((skill, index) => {
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-primary/50 transition-all group text-center shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                
                                <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-slate-950 rounded-2xl group-hover:bg-primary/10 transition-all border border-slate-800 group-hover:border-primary/30 shadow-inner p-3">
                                    <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-md" />
                                </div>
                                <h3 className="font-bold text-slate-200 mb-4 text-sm group-hover:text-white transition-colors">{skill.name}</h3>
                                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/50">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className="bg-gradient-to-r from-primary to-secondary h-full relative"
                                    >
                                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm"></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
