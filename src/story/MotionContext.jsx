import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { osPrefersReducedMotion } from './capabilities';

const MotionContext = createContext({ reduce: false, override: 'auto', setOverride: () => {} });
// eslint-disable-next-line react-refresh/only-export-components
export const useMotionPref = () => useContext(MotionContext);

const KEY = 'portfolio-motion'; // 'on' | 'off' | (absent = follow the system setting)

const readOverride = () => {
    try {
        const v = localStorage.getItem(KEY);
        return v === 'on' || v === 'off' ? v : 'auto';
    } catch {
        return 'auto';
    }
};

/**
 * Decides whether animation is reduced. Default: follow the operating-system setting.
 * The visitor can override it with the Motion switch (remembered in localStorage).
 */
export function MotionProvider({ children }) {
    const [override, setOverrideState] = useState(readOverride);
    const [os] = useState(osPrefersReducedMotion);

    // Motion is ON by default (the site is built around it). The visitor can switch it off with the
    // Motion toggle in the navbar; that choice is remembered. The OS setting is only used for the tooltip.
    const reduce = override === 'off';

    const setOverride = useCallback((v) => {
        setOverrideState(v);
        try {
            if (v === 'auto') localStorage.removeItem(KEY);
            else localStorage.setItem(KEY, v);
        } catch {
            /* storage unavailable: the choice just won't persist */
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.motion = reduce ? 'off' : 'on';
    }, [reduce]);

    const value = useMemo(() => ({ reduce, os, override, setOverride }), [reduce, os, override, setOverride]);

    return (
        <MotionContext.Provider value={value}>
            <MotionConfig reducedMotion={reduce ? 'always' : 'never'}>{children}</MotionConfig>
        </MotionContext.Provider>
    );
}
