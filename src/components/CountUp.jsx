import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { useMotionPref } from '../story/MotionContext';

/** Counts up to `to` when scrolled into view. Only used for numbers that are real (counted from the data or the resume). */
const CountUp = ({ to, suffix = '', className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const { reduce } = useMotionPref();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (reduce) {
            el.textContent = `${to}${suffix}`;
            return;
        }
        if (!inView) return;
        const controls = animate(0, to, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                el.textContent = `${Math.round(v)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [inView, reduce, to, suffix]);

    return (
        <span ref={ref} className={className}>
            {`${reduce ? to : 0}${suffix}`}
        </span>
    );
};

export default CountUp;
