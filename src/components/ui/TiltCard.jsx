import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionPref } from '../../story/MotionContext';

/**
 * Glass card with a gentle 3D tilt and a spotlight that follows the cursor.
 * On touch screens, or with Motion off, it is a plain card.
 */
export default function TiltCard({ children, className = '', max = 7, ...rest }) {
    const ref = useRef(null);
    const { reduce } = useMotionPref();
    const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

    const onMove = (e) => {
        if (e.pointerType === 'touch') return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        if (!reduce) {
            ry.set((px - 0.5) * 2 * max);
            rx.set(-(py - 0.5) * 2 * max);
        }
    };
    const onLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            className={`spotlight relative ${className}`}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
