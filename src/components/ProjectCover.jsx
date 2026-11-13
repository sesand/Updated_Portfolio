import { useId } from 'react';

/**
 * Custom cover art for a project: one visual language for every card (dark stage, perspective grid
 * floor, glow) with a motif that shows what the project does. Pure SVG, so it is sharp at any size,
 * loads instantly and never breaks. Subtle SVG animation gives each cover a little life.
 *
 * motif: 'factory' | 'defect' | 'face' | 'traffic' | 'llm' | 'edge' | 'forecast' | 'dashboard' | 'annotate' | 'iot' | 'workflow'
 */
export default function ProjectCover({ motif = 'factory', accent = '#38bdf8', label, className = '' }) {
    const id = useId().replace(/:/g, '');
    const Motif = MOTIFS[motif] ?? MOTIFS.factory;
    const shift = SHIFT[motif] ?? '0 0';
    return (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label}>
            <defs>
                <radialGradient id={`bg${id}`} cx="50%" cy="38%" r="75%">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
                    <stop offset="45%" stopColor="#0b1224" />
                    <stop offset="100%" stopColor="#020617" />
                </radialGradient>
                <linearGradient id={`floor${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity="0" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0.45" />
                </linearGradient>
                <filter id={`glow${id}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <rect width="400" height="240" fill={`url(#bg${id})`} />
            <Floor id={id} accent={accent} />
            <g filter={`url(#glow${id})`} stroke={accent} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${shift})`}>
                <Motif accent={accent} />
            </g>
        </svg>
    );
}

/** Perspective grid floor: lines meet at a vanishing point, horizontals get closer towards the horizon. */
function Floor({ id, accent }) {
    const vx = 200;
    const vy = 128;
    const rays = [];
    for (let x = -400; x <= 800; x += 50) rays.push(<line key={`r${x}`} x1={vx} y1={vy} x2={x} y2={240} />);
    const rows = [136, 146, 160, 180, 208, 240].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />);
    return (
        <g stroke={`url(#floor${id})`} strokeWidth="1" opacity="0.75">
            <rect x="0" y={vy} width="400" height={240 - vy} fill={accent} opacity="0.04" stroke="none" />
            {rays}
            {rows}
        </g>
    );
}

const Txt = ({ x, y, children, size = 9, anchor = 'start', opacity = 0.95, accent }) => (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={accent} stroke="none" opacity={opacity} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontWeight="600">
        {children}
    </text>
);

/** Corner brackets used as "detection" boxes. */
const Box = ({ x, y, w, h, c = 10 }) => (
    <path d={`M${x} ${y + c}V${y}H${x + c} M${x + w - c} ${y}H${x + w}V${y + c} M${x + w} ${y + h - c}V${y + h}H${x + w - c} M${x + c} ${y + h}H${x}V${y + h - c}`} />
);

/* ------------------------------------------------------------------ motifs ------------------------------------------------------------------ */

function Factory({ accent, defect = false }) {
    const items = [110, 160, 210, 260, 310];
    const bad = defect ? 210 : -1;
    return (
        <>
            {/* camera above the line, scanning beam */}
            <rect x="186" y="26" width="28" height="16" rx="4" />
            <path d="M200 42 L160 150 M200 42 L240 150" opacity="0.5" strokeDasharray="3 5" />
            <path d="M160 150 L200 42 L240 150 Z" fill={accent} opacity="0.08" stroke="none" />
            {/* conveyor */}
            <rect x="70" y="160" width="270" height="22" rx="11" />
            {[86, 130, 174, 218, 262, 306].map((cx) => (
                <circle key={cx} cx={cx} cy="171" r="5" opacity="0.7" />
            ))}
            <g>
                <animateTransform attributeName="transform" type="translate" values="-20 0; 20 0; -20 0" dur="7s" repeatCount="indefinite" />
                {items.map((x) => (
                    <rect key={x} x={x - 14} y="132" width="28" height="26" rx="3" stroke={x === bad ? '#fb7185' : accent} fill={x === bad ? '#fb7185' : accent} fillOpacity="0.12" />
                ))}
            </g>
            {defect ? (
                <>
                    <g stroke="#fb7185">
                        <Box x={186} y={124} w={48} h={42} />
                    </g>
                    <Txt x={210} y={116} anchor="middle" accent="#fb7185">DEFECT 0.97</Txt>
                </>
            ) : (
                <>
                    <Box x={186} y={124} w={48} h={42} />
                    <Txt x={210} y={116} anchor="middle" accent={accent}>OK · 0.99</Txt>
                </>
            )}
        </>
    );
}

function Face({ accent }) {
    // wireframe face: rings of points inside an oval, joined into a mesh
    const cx = 200;
    const cy = 100;
    const rings = [
        [0, 1],
        [0.32, 8],
        [0.6, 12],
        [0.85, 16],
    ];
    const pts = rings.map(([r, n]) => Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return [cx + Math.cos(a) * 46 * r, cy + Math.sin(a) * 58 * r];
    }));
    const lines = [];
    pts.forEach((ring, ri) => {
        ring.forEach((p, i) => {
            const q = ring[(i + 1) % ring.length];
            if (ring.length > 1) lines.push([p, q]);
            if (ri > 0) {
                const inner = pts[ri - 1];
                const j = Math.round((i / ring.length) * inner.length) % inner.length;
                lines.push([p, inner[j]]);
            }
        });
    });
    return (
        <>
            <g strokeWidth="1" opacity="0.8">
                {lines.map(([p, q], i) => (
                    <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} />
                ))}
            </g>
            {pts.flat().map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.8" fill={accent} stroke="none" />
            ))}
            <Box x={136} y={30} w={128} h={142} c={14} />
            {/* scan line */}
            <line x1="138" x2="262" y1="40" y2="40" strokeWidth="2.5" opacity="0.9">
                <animate attributeName="y1" values="38;170;38" dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="y2" values="38;170;38" dur="3.2s" repeatCount="indefinite" />
            </line>
            <rect x="272" y="40" width="96" height="44" rx="6" fill="#020617" fillOpacity="0.7" />
            <Txt x={282} y={57} accent={accent}>ID 0247</Txt>
            <Txt x={282} y={73} accent={accent} opacity={0.7}>MATCH 98.6%</Txt>
        </>
    );
}

function Traffic({ accent }) {
    return (
        <>
            {/* road */}
            <path d="M110 240 L188 128 M290 240 L212 128" />
            <path d="M200 240 L200 128" strokeDasharray="10 10" opacity="0.6">
                <animate attributeName="stroke-dashoffset" values="0;-40" dur="1s" repeatCount="indefinite" />
            </path>
            {/* car */}
            <g>
                <animateTransform attributeName="transform" type="translate" values="0 6; 0 -4; 0 6" dur="3s" repeatCount="indefinite" />
                <path d="M172 186 h56 l-6 -18 h-44 z" fill={accent} fillOpacity="0.12" />
                <rect x="166" y="186" width="68" height="16" rx="4" fill={accent} fillOpacity="0.12" />
                <Box x={156} y={158} w={88} h={54} />
                <rect x="186" y="193" width="28" height="7" rx="1.5" />
            </g>
            <rect x="150" y="128" width="100" height="22" rx="5" fill="#020617" fillOpacity="0.75" />
            <Txt x={200} y={143} anchor="middle" accent={accent}>KA-01 · 72 km/h</Txt>
            {/* speed gauge */}
            <path d="M282 102 A40 40 0 1 1 342 102" opacity="0.8" />
            <line x1="312" y1="80" x2="332" y2="62" strokeWidth="3">
                <animateTransform attributeName="transform" type="rotate" values="-50 312 80; 10 312 80; -50 312 80" dur="4s" repeatCount="indefinite" />
            </line>
            <circle cx="312" cy="80" r="4" fill={accent} />
            <Txt x={312} y={114} anchor="middle" accent={accent} opacity={0.7}>SPEED</Txt>
        </>
    );
}

function Llm({ accent }) {
    const nodes = [
        [280, 60],
        [340, 96],
        [300, 150],
        [240, 120],
        [350, 170],
    ];
    return (
        <>
            {/* chat */}
            <rect x="46" y="44" width="130" height="34" rx="12" />
            <path d="M60 78 l-8 12 l20 -12" />
            <line x1="62" y1="57" x2="150" y2="57" opacity="0.6" />
            <line x1="62" y1="67" x2="124" y2="67" opacity="0.6" />
            <rect x="80" y="100" width="118" height="30" rx="12" fill={accent} fillOpacity="0.14" />
            <line x1="94" y1="115" x2="176" y2="115" opacity="0.8">
                <animate attributeName="x2" values="94;176;176" dur="2.4s" repeatCount="indefinite" />
            </line>
            {/* agent / tool graph */}
            {nodes.map(([x, y], i) => (
                <line key={`l${i}`} x1={290} y1={108} x2={x} y2={y} opacity="0.55" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.2s" repeatCount="indefinite" />
                </line>
            ))}
            {nodes.map(([x, y], i) => (
                <circle key={`n${i}`} cx={x} cy={y} r="9" fill="#020617" />
            ))}
            <circle cx="290" cy="108" r="22" fill={accent} fillOpacity="0.15" />
            <Txt x={290} y={112} anchor="middle" size={11} accent={accent}>LLM</Txt>
            <Txt x={280} y={44} anchor="middle" accent={accent} opacity={0.7}>RAG</Txt>
            <Txt x={350} y={196} anchor="middle" accent={accent} opacity={0.7}>TOOLS</Txt>
        </>
    );
}

function Edge({ accent }) {
    const pins = [0, 1, 2, 3, 4];
    return (
        <>
            {/* compute module */}
            <rect x="160" y="64" width="80" height="80" rx="8" fill={accent} fillOpacity="0.1" />
            <rect x="178" y="82" width="44" height="44" rx="4" />
            <Txt x={200} y={108} anchor="middle" size={10} accent={accent}>CM4</Txt>
            {pins.map((i) => (
                <g key={i} opacity="0.75">
                    <line x1={172 + i * 14} y1="64" x2={172 + i * 14} y2="52" />
                    <line x1={172 + i * 14} y1="144" x2={172 + i * 14} y2="156" />
                    <line x1="160" y1={76 + i * 14} x2="148" y2={76 + i * 14} />
                    <line x1="240" y1={76 + i * 14} x2="252" y2={76 + i * 14} />
                </g>
            ))}
            {/* instruments being tracked */}
            <g>
                <circle cx="84" cy="80" r="9" />
                <circle cx="102" cy="80" r="9" />
                <path d="M90 88 L118 130 M96 88 L68 130" />
                <Box x={56} y={62} w={74} h={78} />
                <Txt x={56} y={56} accent={accent} opacity={0.8}>SCISSORS 0.93</Txt>
            </g>
            <g>
                <path d="M286 70 L330 128 M286 70 l-6 8 l44 54" />
                <Box x={270} y={58} w={72} h={84} />
                <Txt x={270} y={52} accent={accent} opacity={0.8}>SCALPEL 0.91</Txt>
            </g>
            <path d="M132 100 Q142 98 148 98 M252 98 Q262 98 270 100" strokeDasharray="4 4" opacity="0.6">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
            </path>
        </>
    );
}

function Forecast({ accent }) {
    return (
        <>
            <path d="M50 40 V180 H360" opacity="0.6" />
            {/* history */}
            <path d="M50 150 L90 130 L130 140 L170 104 L210 116 L240 86" strokeWidth="2.5" />
            {/* forecast band + line */}
            <path d="M240 86 L280 60 L320 50 L360 36 L360 96 L320 96 L280 104 L240 86 Z" fill={accent} fillOpacity="0.14" stroke="none" />
            <path d="M240 86 L280 82 L320 72 L360 64" strokeDasharray="6 6" strokeWidth="2.5">
                <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.5s" repeatCount="indefinite" />
            </path>
            {[
                [90, 130],
                [130, 140],
                [170, 104],
                [210, 116],
                [240, 86],
            ].map(([x, y]) => (
                <circle key={x} cx={x} cy={y} r="3.5" fill={accent} />
            ))}
            <line x1="240" y1="40" x2="240" y2="180" opacity="0.35" strokeDasharray="3 5" />
            <Txt x={246} y={170} accent={accent} opacity={0.75}>FORECAST →</Txt>
            <rect x="60" y="190" width="150" height="26" rx="6" fill="#020617" fillOpacity="0.75" />
            <Txt x={70} y={207} accent={accent}>NEXT WEEK · ₹ 6,480 / night</Txt>
        </>
    );
}

function Dashboard({ accent }) {
    const bars = [40, 62, 50, 78, 66, 90];
    return (
        <>
            <rect x="44" y="34" width="150" height="120" rx="10" fill="#020617" fillOpacity="0.6" />
            {bars.map((h, i) => (
                <rect key={i} x={60 + i * 21} y={140 - h} width="13" height={h} rx="3" fill={accent} fillOpacity="0.25">
                    <animate attributeName="height" values={`${h * 0.6};${h};${h * 0.6}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="y" values={`${140 - h * 0.6};${140 - h};${140 - h * 0.6}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
                </rect>
            ))}
            <rect x="208" y="34" width="148" height="56" rx="10" fill="#020617" fillOpacity="0.6" />
            <Txt x={222} y={56} accent={accent} opacity={0.7}>AUTOMATED</Txt>
            <Txt x={222} y={76} size={16} accent={accent}>+38%</Txt>
            <rect x="208" y="98" width="148" height="56" rx="10" fill="#020617" fillOpacity="0.6" />
            <circle cx="238" cy="126" r="16" opacity="0.35" />
            <path d="M238 110 A16 16 0 1 1 222 126" strokeWidth="4" />
            <Txt x={264} y={122} accent={accent} opacity={0.7}>ACCURACY</Txt>
            <Txt x={264} y={138} size={12} accent={accent}>96.2%</Txt>
        </>
    );
}

function Annotate({ accent }) {
    return (
        <>
            <rect x="96" y="32" width="208" height="132" rx="8" fill="#020617" fillOpacity="0.55" />
            {/* simple scene: shelves and boxes */}
            <path d="M110 140 H290 M110 96 H290" opacity="0.4" />
            <rect x="124" y="104" width="34" height="34" rx="2" opacity="0.6" />
            <rect x="176" y="70" width="40" height="24" rx="2" opacity="0.6" />
            <rect x="236" y="108" width="44" height="30" rx="2" opacity="0.6" />
            <Box x={118} y={98} w={46} h={46} c={8} />
            <Txt x={118} y={92} accent={accent}>box 0.94</Txt>
            <Box x={230} y={102} w={56} h={42} c={8} />
            <Txt x={230} y={96} accent={accent}>pallet 0.88</Txt>
            {/* an annotation being drawn */}
            <rect x="170" y="64" width="52" height="36" strokeDasharray="5 4" opacity="0.9">
                <animate attributeName="width" values="10;52;52" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="height" values="8;36;36" dur="2.6s" repeatCount="indefinite" />
            </rect>
            <rect x="96" y="172" width="208" height="20" rx="6" fill="#020617" fillOpacity="0.7" />
            <Txt x={200} y={186} anchor="middle" accent={accent}>CVAT → ROBOFLOW → YOLO</Txt>
        </>
    );
}

function Iot({ accent }) {
    return (
        <>
            {/* bulb */}
            <path d="M200 50 a34 34 0 0 1 22 60 v14 h-44 v-14 a34 34 0 0 1 22 -60 z" fill={accent}>
                <animate attributeName="fill-opacity" values="0.08;0.35;0.08" dur="2.8s" repeatCount="indefinite" />
            </path>
            <path d="M182 132 h36 M186 140 h28" />
            {[-60, -30, 0, 30, 60].map((a) => (
                <line key={a} x1="200" y1="84" x2="200" y2="30" transform={`rotate(${a} 200 84)`} strokeDasharray="0 46 12" opacity="0.7" />
            ))}
            {/* sensor + waves */}
            <rect x="290" y="96" width="34" height="34" rx="6" fill={accent} fillOpacity="0.12" />
            <circle cx="307" cy="113" r="5" fill={accent} />
            {[18, 30, 42].map((r, i) => (
                <path key={r} d={`M${290 - 4} ${113 - r * 0.6} A${r} ${r} 0 0 0 ${290 - 4} ${113 + r * 0.6}`} opacity="0.7">
                    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </path>
            ))}
            {/* switch */}
            <rect x="72" y="100" width="54" height="26" rx="13" />
            <circle cx="113" cy="113" r="9" fill={accent} />
            <Txt x={99} y={148} anchor="middle" accent={accent} opacity={0.75}>AUTO</Txt>
        </>
    );
}

function Workflow({ accent }) {
    const flow = 'M110 104 C140 104 140 70 170 70 M110 104 C140 104 140 138 170 138 M230 70 C260 70 260 104 290 104 M230 138 C260 138 260 104 290 104';
    return (
        <>
            {/* trigger: email */}
            <rect x="50" y="84" width="60" height="40" rx="8" fill={accent} fillOpacity="0.12" />
            <path d="M62 94 h36 v22 h-36 z M62 94 l18 13 l18 -13" />
            <rect x="170" y="52" width="60" height="36" rx="8" />
            <Txt x={200} y={74} anchor="middle" accent={accent}>FILTER</Txt>
            <rect x="170" y="120" width="60" height="36" rx="8" />
            <Txt x={200} y={142} anchor="middle" accent={accent}>AI</Txt>
            <rect x="290" y="84" width="60" height="40" rx="8" fill={accent} fillOpacity="0.12" />
            <path d="M306 104 l9 9 l18 -18" strokeWidth="3" />
            <path d={flow} opacity="0.4" />
            <path d={flow} strokeDasharray="6 10">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="1.1s" repeatCount="indefinite" />
            </path>
            <Txt x={80} y={142} anchor="middle" accent={accent} opacity={0.7}>TRIGGER</Txt>
            <Txt x={320} y={142} anchor="middle" accent={accent} opacity={0.7}>SENT</Txt>
        </>
    );
}

// nudge a few motifs down/right so nothing sits under the card's index chip in the top-left corner
const SHIFT = { llm: '0 18', dashboard: '6 22', annotate: '0 14', face: '0 6' };

const MOTIFS = {
    factory: Factory,
    defect: (p) => <Factory {...p} defect />,
    face: Face,
    traffic: Traffic,
    llm: Llm,
    edge: Edge,
    forecast: Forecast,
    dashboard: Dashboard,
    annotate: Annotate,
    iot: Iot,
    workflow: Workflow,
};
