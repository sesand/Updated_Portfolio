import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// colour grade per chapter (same order as chapters.js)
const GRADE = ['#38bdf8', '#818cf8', '#a78bfa', '#38bdf8', '#818cf8', '#a78bfa', '#38bdf8'];
const PATH_LENGTH = 66; // how far the camera travels along -z over the whole scroll

/** Random nodes in a long tunnel (with a clear corridor for the camera) and links between near neighbours. */
function makeNetwork(count) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 2.4 + Math.sqrt(Math.random()) * 13;
        const a = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = Math.sin(a) * r * 0.7;
        pos[i * 3 + 2] = 8 - Math.random() * 82;
    }
    const cell = 4.6;
    const grid = new Map();
    const key = (x, y, z) => `${x},${y},${z}`;
    for (let i = 0; i < count; i++) {
        const k = key(Math.floor(pos[i * 3] / cell), Math.floor(pos[i * 3 + 1] / cell), Math.floor(pos[i * 3 + 2] / cell));
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push(i);
    }
    const seen = new Set();
    const lines = [];
    for (let i = 0; i < count; i++) {
        const cx = Math.floor(pos[i * 3] / cell), cy = Math.floor(pos[i * 3 + 1] / cell), cz = Math.floor(pos[i * 3 + 2] / cell);
        const near = [];
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
            for (const j of grid.get(key(cx + dx, cy + dy, cz + dz)) || []) {
                if (j === i) continue;
                const d = Math.hypot(pos[i * 3] - pos[j * 3], pos[i * 3 + 1] - pos[j * 3 + 1], pos[i * 3 + 2] - pos[j * 3 + 2]);
                if (d < cell) near.push([d, j]);
            }
        }
        near.sort((a, b) => a[0] - b[0]);
        for (const [, j] of near.slice(0, 2)) {
            const id = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (seen.has(id)) continue;
            seen.add(id);
            lines.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
    }
    return { positions: pos, links: new Float32Array(lines) };
}

const ARTIFACTS = [
    (<icosahedronGeometry key="a" args={[1.7, 0]} />),
    (<octahedronGeometry key="b" args={[1.7, 0]} />),
    (<torusGeometry key="c" args={[1.3, 0.42, 14, 36]} />),
    (<dodecahedronGeometry key="d" args={[1.6, 0]} />),
    (<torusKnotGeometry key="e" args={[1.05, 0.3, 80, 10]} />),
    (<icosahedronGeometry key="f" args={[1.6, 1]} />),
    (<octahedronGeometry key="g" args={[1.9, 1]} />),
];

function Scene({ progressRef, activeRef, tier }) {
    const count = tier === 'high' ? 640 : 260;
    const { positions, links } = useMemo(() => makeNetwork(count), [count]);

    const pointsMat = useRef(null);
    const linesMat = useRef(null);
    const artifacts = useRef(null);
    const target = useMemo(() => new THREE.Color(GRADE[0]), []);
    const wireMat = useMemo(
        () => new THREE.MeshBasicMaterial({ color: GRADE[0], wireframe: true, transparent: true, opacity: 0.32, depthWrite: false }),
        []
    );
    const mouse = useRef({ x: 0, y: 0, sx: 0, sy: 0 });

    useEffect(() => {
        const move = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => {
            window.removeEventListener('pointermove', move);
            wireMat.dispose();
        };
    }, [wireMat]);

    useFrame((state, delta) => {
        const p = progressRef.current;
        const m = mouse.current;
        const k = Math.min(1, delta * 3);
        m.sx += (m.x - m.sx) * k;
        m.sy += (m.y - m.sy) * k;

        // the camera flies down the tunnel as the page scrolls
        const z = 6 - p * PATH_LENGTH;
        const cam = state.camera;
        cam.position.set(m.sx * 1.5 + Math.sin(p * Math.PI * 3) * 0.9, m.sy * 1.0 + Math.cos(p * Math.PI * 2) * 0.6, z);
        cam.lookAt(m.sx * 0.7, m.sy * 0.45, z - 12);
        cam.rotation.z = p * 0.6 + m.sx * 0.06;

        // colour grade follows the chapter
        target.set(GRADE[activeRef.current] ?? GRADE[0]);
        const c = Math.min(1, delta * 2.2);
        pointsMat.current?.color.lerp(target, c);
        linesMat.current?.color.lerp(target, c);
        wireMat.color.lerp(target, c);

        artifacts.current?.children.forEach((mesh, i) => {
            mesh.rotation.x += delta * (0.12 + i * 0.015);
            mesh.rotation.y += delta * (0.18 + i * 0.01);
        });
    });

    return (
        <>
            <fog attach="fog" args={['#020617', 6, 46]} />
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial ref={pointsMat} size={0.16} color={GRADE[0]} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
            </points>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[links, 3]} />
                </bufferGeometry>
                <lineBasicMaterial ref={linesMat} color={GRADE[0]} transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
            <group ref={artifacts}>
                {ARTIFACTS.map((geo, i) => {
                    const z = 6 - ((i + 0.5) / ARTIFACTS.length) * PATH_LENGTH;
                    const side = i % 2 === 0 ? 1 : -1;
                    return (
                        <mesh key={i} position={[side * (3.4 + (i % 3) * 0.6), (i % 2 ? -1 : 1) * 1.1, z]} material={wireMat}>
                            {geo}
                        </mesh>
                    );
                })}
            </group>
        </>
    );
}

export default function World({ progressRef, activeRef, tier }) {
    const [visible, setVisible] = useState(() => !document.hidden);

    useEffect(() => {
        const onVis = () => setVisible(!document.hidden);
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, []);

    return (
        <Canvas
            dpr={tier === 'high' ? [1, 1.5] : [1, 1.25]}
            frameloop={visible ? 'always' : 'never'}
            camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 90 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            aria-hidden="true"
        >
            <Scene progressRef={progressRef} activeRef={activeRef} tier={tier} />
        </Canvas>
    );
}
