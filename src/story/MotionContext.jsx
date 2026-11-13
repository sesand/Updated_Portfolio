import { createContext, useContext, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';

const MotionContext = createContext({ reduce: false });
// eslint-disable-next-line react-refresh/only-export-components
export const useMotionPref = () => useContext(MotionContext);

const VALUE = { reduce: false };

/**
 * The site is built around motion (3D, video, animation), so it is always on. There is no visitor
 * toggle. Components still read `reduce` from here so this is the one place to change that later.
 */
export function MotionProvider({ children }) {
    useEffect(() => {
        document.documentElement.dataset.motion = 'on';
        try {
            localStorage.removeItem('portfolio-motion'); // an old saved "off" choice from the removed toggle
        } catch {
            /* storage unavailable */
        }
    }, []);

    return (
        <MotionContext.Provider value={VALUE}>
            <MotionConfig reducedMotion="never">{children}</MotionConfig>
        </MotionContext.Provider>
    );
}
