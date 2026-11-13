import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { GraduationCap, Languages, User, Cpu } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const About = () => {
    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-2 mb-12">
                    <User className="text-primary w-6 h-6" />
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">About</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
                    Who I <span className="text-gradient">Am</span>
                </h2>

                <motion.p {...fadeUp()} className="text-lg text-slate-300 leading-relaxed max-w-4xl mb-16">
                    {profile.about}
                </motion.p>

                <div className="flex items-center gap-2 mb-8">
                    <Cpu className="text-primary w-5 h-5" />
                    <h3 className="text-xl font-bold text-white">Core Expertise</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {profile.coreExpertise.map((item, i) => (
                        <motion.div
                            key={item.title}
                            {...fadeUp(i * 0.08)}
                            className="min-w-0 bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-primary/30 transition-all"
                        >
                            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 min-w-0">
                        <div className="flex items-center gap-2 mb-8">
                            <GraduationCap className="text-primary w-5 h-5" />
                            <h3 className="text-xl font-bold text-white">Education</h3>
                        </div>
                        <div className="space-y-6">
                            {profile.education.map((edu, i) => (
                                <motion.div
                                    key={edu.degree}
                                    {...fadeUp(i * 0.1)}
                                    className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-primary/30 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                                        <span className="self-start px-3 py-1 bg-slate-800 text-primary text-xs font-bold rounded-full border border-slate-700">{edu.period}</span>
                                    </div>
                                    <p className="text-secondary font-medium">{edu.school}</p>
                                    <p className="text-slate-400 text-sm mt-1">{edu.score}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-8">
                            <Languages className="text-primary w-5 h-5" />
                            <h3 className="text-xl font-bold text-white">Languages</h3>
                        </div>
                        <div className="space-y-4">
                            {profile.languages.map((lang, i) => (
                                <motion.div
                                    key={lang.name}
                                    {...fadeUp(i * 0.1)}
                                    className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
                                >
                                    <h4 className="text-lg font-bold text-white">{lang.name}</h4>
                                    <p className="text-slate-400 text-sm">{lang.level}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
