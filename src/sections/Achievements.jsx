import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { BookOpen, ExternalLink } from 'lucide-react';

const Achievements = () => {
    return (
        <section id="achievements" className="py-24 bg-slate-950 relative border-t border-slate-900">
            <div className="container mx-auto px-6 relative z-10">
                {profile.publications?.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center gap-2 mb-12">
                            <BookOpen className="text-primary w-6 h-6" />
                            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Publication</span>
                        </div>
                        <div className="space-y-6">
                            {profile.publications.map((pub) => (
                                <motion.a
                                    key={pub.doi}
                                    href={pub.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -4 }}
                                    className="block p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-primary/30 backdrop-blur-xl transition-all group"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">{pub.venue}</span>
                                        <ExternalLink size={18} className="text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-primary transition-colors">{pub.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4 max-w-4xl">{pub.description}</p>
                                    <p className="text-slate-500 text-xs font-mono break-all">DOI: {pub.doi}</p>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 mb-12">
                    <span className="text-primary font-mono text-xl">★</span>
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Certifications & Achievements</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {profile.achievements.map((item) => (
                        <motion.div
                            key={item.title}
                            whileHover={{ y: -5 }}
                            className="min-w-0 p-6 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-4xl">🏆</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2 pr-10 group-hover:text-primary transition-colors">{item.title}</h3>
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
