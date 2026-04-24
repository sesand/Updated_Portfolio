import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { Briefcase, MapPin } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-2 mb-12">
                    <Briefcase className="text-primary w-6 h-6" />
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Journey</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white">Professional <span className="text-gradient">Experience</span></h2>

                <div className="space-y-8 max-w-4xl">
                    {profile.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 border-l border-slate-800"
                        >
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_#38bdf8]" />
                            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-primary/30 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                    <span className="px-4 py-1 bg-slate-800 text-primary text-xs font-bold rounded-full border border-slate-700">{exp.period}</span>
                                </div>
                                <h4 className="text-lg text-secondary font-medium mb-4">{exp.company}</h4>
                                <p className="text-slate-400 leading-relaxed mb-6">{exp.description}</p>
                                <div className="flex items-center gap-2 text-slate-500 text-sm italic">
                                    <MapPin size={14} /> {exp.location}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
