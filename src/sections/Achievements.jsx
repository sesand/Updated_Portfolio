import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const Achievements = () => {
    return (
        <section id="achievements" className="py-24 bg-slate-950 relative border-t border-slate-900">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-center gap-2 mb-12">
                    <span className="text-primary font-mono text-xl">★</span>
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Achievements & Awards</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {profile.achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-4xl">🏆</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-slate-400 text-sm font-medium">{item.organization}</p>
                            <div className="mt-6 w-8 h-1 bg-primary/30 group-hover:w-full transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
