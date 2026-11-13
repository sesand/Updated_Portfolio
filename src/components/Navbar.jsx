import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Play } from 'lucide-react';
import { profile } from '../data/profile';
import Logo from './Logo';
import { useStory } from '../story/StoryContext';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { play, mode } = useStory();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const playStory = () => {
        setIsMenuOpen(false);
        play();
    };

    return (
        <nav
            data-story-ui
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${mode === 'off' ? '' : 'mt-[34px]'} ${isScrolled ? 'border-b border-white/5 bg-slate-950/80 py-3 backdrop-blur-lg' : 'bg-transparent py-5'}`}
        >
            <div className="container mx-auto flex items-center justify-between px-6">
                <a href="#home" className="flex shrink-0 items-center gap-3 whitespace-nowrap font-bold tracking-tighter text-white" aria-label={`${profile.name} — home`}>
                    <Logo size={44} />
                    <span className="hidden text-lg sm:block">{profile.name}</span>
                </a>

                <div className="hidden items-center gap-6 whitespace-nowrap xl:flex">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 transition-colors hover:text-primary">{link.name}</a>
                    ))}
                    <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
                        <button
                            type="button"
                            onClick={playStory}
                            className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-slate-950"
                        >
                            <Play size={14} fill="currentColor" /> Play story
                        </button>
                        <a href={profile.resume.file} download={profile.resume.name} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-400 transition-colors hover:text-primary" title="Download Resume">
                            <Download size={16} /> Resume
                        </a>
                        <a href={`mailto:${profile.social.email}`} className="shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-primary/25 transition-all hover:opacity-90">Hire me</a>
                    </div>
                </div>

                <button
                    type="button"
                    className="font-bold text-white xl:hidden"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((v) => !v)}
                >
                    {isMenuOpen ? 'CLOSE' : 'MENU'}
                </button>
            </div>

            {isMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-slate-800 bg-slate-900 p-6 shadow-xl xl:hidden">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-primary">{link.name}</a>
                    ))}
                    <button type="button" onClick={playStory} className="flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 py-3 font-bold text-primary">
                        <Play size={16} fill="currentColor" /> Play story
                    </button>
                    <div className="flex items-center gap-4 border-t border-slate-800 pt-4">
                        <a href={profile.resume.file} download={profile.resume.name} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-800 py-3 text-center font-bold text-white">
                            <Download size={16} /> Resume
                        </a>
                        <a href={`mailto:${profile.social.email}`} className="flex-1 rounded-lg bg-primary py-3 text-center font-bold text-slate-950">Hire me</a>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
