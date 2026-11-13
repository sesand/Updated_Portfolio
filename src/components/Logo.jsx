import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Sesan Duraisamy logo mark: a hexagon (neuron / chip) with an "S" drawn as one path through three nodes.
 * `animate` draws the S in when the logo first appears (skipped for reduced motion).
 * The same artwork lives in /public/logo.svg and /public/favicon.svg.
 */
const Logo = ({ size = 44, animate = true, className = '' }) => {
    const uid = useId().replace(/:/g, '');
    const reduce = useReducedMotion();
    const draw = animate && !reduce;

    return (
        <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Sesan Duraisamy logo" className={className}>
            <defs>
                <linearGradient id={`g${uid}`} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#38bdf8" />
                    <stop offset="0.55" stopColor="#818cf8" />
                    <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
                <radialGradient id={`b${uid}`} cx="0.35" cy="0.25" r="0.9">
                    <stop offset="0" stopColor="#16233f" />
                    <stop offset="1" stopColor="#070d1c" />
                </radialGradient>
                <filter id={`f${uid}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            <motion.path
                d="M32 3.5 56.7 17.75v28.5L32 60.5 7.3 46.25v-28.5Z"
                fill={`url(#b${uid})`}
                stroke={`url(#g${uid})`}
                strokeWidth="2.6"
                strokeLinejoin="round"
                initial={draw ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
            <path d="M32 9.2 51.8 20.6v22.8L32 54.8 12.2 43.4V20.6Z" fill="none" stroke="#818cf8" strokeOpacity="0.22" strokeWidth="0.8" />
            <motion.path
                d="M43 21C43 14.5 21 14.5 21 25C21 35 43 29 43 39.5C43 50 21 50 21 43"
                fill="none"
                stroke={`url(#g${uid})`}
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#f${uid})`}
                initial={draw ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.5, ease: 'easeInOut' }}
            />
            <g fill="#e0f2fe" filter={`url(#f${uid})`}>
                {[[43, 21], [32, 32.2], [21, 43]].map(([cx, cy], i) => (
                    <motion.circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="3.1"
                        initial={draw ? { scale: 0, opacity: 0 } : false}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                        transition={{ delay: 0.9 + i * 0.25, type: 'spring', stiffness: 260, damping: 14 }}
                    />
                ))}
            </g>
        </svg>
    );
};

export default Logo;
