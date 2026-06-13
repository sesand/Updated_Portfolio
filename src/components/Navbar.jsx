import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#experience' },
        { name: 'Stack', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-slate-950/80 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.a href="#" className="flex items-center gap-3 font-bold tracking-tighter text-white">
                    <img src="/assets/profile.jpg" alt="Sesan Duraisamy" className="w-12 h-12 rounded-full border-2 border-primary/50 object-cover bg-slate-800" />
                    <span className="text-xl hidden sm:block">Sesan Duraisamy</span>
                </motion.a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">{link.name}</a>
                    ))}
                    
                    <div className="flex items-center gap-4 border-l border-slate-700 pl-8">
                        <a href="/assets/AI_Engineer_SesanD_062026.docx" download="AI_Engineer_SesanD_062026.docx" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors flex items-center gap-2" title="Download Resume">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Resume
                        </a>
                        <a href={`mailto:${profile.social.email}`} className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-slate-950 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25">Hire Me</a>
                    </div>
                </div>

                <button className="md:hidden text-white font-bold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? 'CLOSE' : 'MENU'}
                </button>
            </div>

            {isMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden shadow-xl">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-primary">{link.name}</a>
                    ))}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800">
                        <a href="/assets/AI_Engineer_SesanD_062026.docx" download="AI_Engineer_SesanD_062026.docx" className="flex-1 text-center py-3 bg-slate-800 text-white rounded-lg font-bold flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Resume
                        </a>
                        <a href={`mailto:${profile.social.email}`} className="flex-1 text-center py-3 bg-primary text-slate-950 rounded-lg font-bold">Hire Me</a>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
