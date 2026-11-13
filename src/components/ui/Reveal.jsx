import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/** Fade and rise into view once. Honours the Motion switch via MotionConfig. */
export function Reveal({ children, delay = 0, y = 36, className = '', as = 'div' }) {
    const Tag = motion[as];
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.8, delay, ease: EASE }}
        >
            {children}
        </Tag>
    );
}

/** Headline that rises word by word out of a mask. The full text is kept for screen readers. */
export function SplitWords({ text, className = '', delay = 0, as = 'span' }) {
    const Tag = motion[as];
    const words = text.split(' ');
    return (
        <Tag className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -60px 0px' }} transition={{ staggerChildren: 0.06, delayChildren: delay }}>
            {words.map((w, i) => (
                <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span
                        className="inline-block"
                        variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}
                    >
                        {w}
                    </motion.span>
                    {i < words.length - 1 ? ' ' : ''}
                </span>
            ))}
        </Tag>
    );
}
