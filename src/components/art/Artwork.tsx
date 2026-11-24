"use client";

import { useId, type ReactNode } from "react";
import type { ArtVariant } from "@/data/types";
import { mix, rng, ridgePath } from "./geometry";

/*
 * Ilustrações em código. Cada cena é um SVG de 1200 x 800 que cobre o espaço
 * disponível (preserveAspectRatio "slice"), com camadas de montanhas que
 * ficam mais claras ao longe, névoa que se move devagar e um sol que pulsa.
 */

interface Tone {
  sky: [string, string, string];
  sun: string;
  ridges: [string, string, string, string];
  mist: string;
  stars: boolean;
  ground: string;
}

const TONES: Record<string, Tone> = {
  dawn: {
    sky: ["#1d1830", "#7b3f55", "#e9b15b"],
    sun: "#f6d98a",
    ridges: ["#6a5470", "#4a3a5a", "#2f2640", "#1b1726"],
    mist: "#f2d9b0",
    stars: false,
    ground: "#120f18",
  },
  dusk: {
    sky: ["#0f0d1a", "#4b2236", "#d27a34"],
    sun: "#f0a24a",
    ridges: ["#6b4150", "#46293f", "#2b1d33", "#171220"],
    mist: "#e8b27a",
    stars: false,
    ground: "#100c15",
  },
  noon: {
    sky: ["#16243b", "#3d5f7a", "#b9c9b0"],
    sun: "#f4ecc8",
    ridges: ["#6f8a8c", "#4d6b6c", "#314c4d", "#1e3234"],
    mist: "#e6efe0",
    stars: false,
    ground: "#0f1a1b",
  },
  night: {
    sky: ["#07070e", "#161a2e", "#34304f"],
    sun: "#e8e4d0",
    ridges: ["#2e3350", "#212640", "#161a2e", "#0d101c"],
    mist: "#8f9ac4",
    stars: true,
    ground: "#080a12",
  },
  jungle: {
    sky: ["#0b1512", "#1f3a33", "#6f8f6b"],
    sun: "#e9e4bd",
    ridges: ["#3f5f55", "#2c4a41", "#1c332d", "#0f201c"],
    mist: "#c5d8c0",
    stars: false,
    ground: "#09130f",
  },
};

const SCENE_TONE: Record<ArtVariant, keyof typeof TONES> = {
  andes: "dawn",
  valley: "noon",
  temple: "dusk",
  road: "dawn",
  ruins: "jungle",
  machu: "noon",
  terraces: "dusk",
  plaza: "dusk",
};

/* ---------- peças compartilhadas ---------- */

function Ridge({
  t,
  i,
  seed,
  base,
  amp,
}: {
  t: Tone;
  i: 0 | 1 | 2 | 3;
  seed: number;
  base: number;
  amp: number;
}) {
  return <path d={ridgePath(seed, base, amp)} fill={t.ridges[i]} />;
}

function Mist({ uid, y, reverse = false }: { uid: string; y: number; reverse?: boolean }) {
  return (
    <g className={reverse ? "animate-drift-rev" : "animate-drift"} opacity="0.6">
      <ellipse cx="300" cy={y} rx="520" ry="46" fill={`url(#${uid}-mist)`} />
      <ellipse cx="950" cy={y + 30} rx="480" ry="40" fill={`url(#${uid}-mist)`} />
    </g>
  );
}

function Sun({ uid, t, x, y, r }: { uid: string; t: Tone; x: number; y: number; r: number }) {
  return (
    <g className="animate-glow">
      <circle cx={x} cy={y} r={r * 3.4} fill={`url(#${uid}-glow)`} />
      <circle cx={x} cy={y} r={r} fill={t.sun} />
    </g>
  );
}

function Stars() {
  const r = rng(99);
  return (
    <g fill="#f3eddc">
      {Array.from({ length: 46 }, (_, i) => (
        <circle
          key={i}
          cx={(r() * 1200).toFixed(0)}
          cy={(r() * 420).toFixed(0)}
          r={(0.6 + r() * 1.4).toFixed(1)}
          opacity={(0.3 + r() * 0.6).toFixed(2)}
        />
      ))}
    </g>
  );
}

function Condor({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 0 C14 -12 30 -12 44 2 C58 -12 74 -12 88 0 C74 -5 58 -3 44 9 C30 -3 14 -5 0 0Z"
      fill={color}
      opacity="0.85"
    />
  );
}

/** Pedras encaixadas em fileiras, como a alvenaria inca. */
function Masonry({
  seed,
  x,
  y,
  w,
  rows,
  rowH,
  fill,
  stroke,
}: {
  seed: number;
  x: number;
  y: number;
  w: number;
  rows: number;
  rowH: number;
  fill: string;
  stroke: string;
}) {
  const r = rng(seed);
  const stones: ReactNode[] = [];
  for (let row = 0; row < rows; row++) {
    let cx = x - (row % 2 ? 40 : 0);
    while (cx < x + w) {
      const sw = 70 + r() * 80;
      stones.push(
        <rect
          key={`${row}-${cx.toFixed(0)}`}
          x={cx.toFixed(0)}
          y={y + row * rowH}
          width={sw.toFixed(0)}
          height={rowH - 3}
          rx="5"
          fill={mix(fill, "#000000", r() * 0.25)}
          stroke={stroke}
          strokeWidth="2"
        />,
      );
      cx += sw;
    }
  }
  return <g>{stones}</g>;
}

/* ---------- cenas ---------- */

function renderScene(variant: ArtVariant, t: Tone, uid: string): ReactNode {
  switch (variant) {
    case "andes":
      return (
        <>
          <Sun uid={uid} t={t} x={800} y={300} r={62} />
          <Condor x={240} y={190} color={t.ground} />
          <Condor x={420} y={140} color={t.ground} />
          <Ridge t={t} i={0} seed={11} base={480} amp={170} />
          <Mist uid={uid} y={520} />
          <Ridge t={t} i={1} seed={23} base={560} amp={150} />
          <Mist uid={uid} y={610} reverse />
          <Ridge t={t} i={2} seed={37} base={650} amp={120} />
          <Ridge t={t} i={3} seed={51} base={725} amp={70} />
        </>
      );

    case "valley": {
      const r = rng(5);
      const houses: ReactNode[] = [];
      for (let row = 0; row < 4; row++) {
        const cols = 9 - row;
        for (let c = 0; c < cols; c++) {
          const w = 44 + row * 10;
          const h = 26 + row * 5;
          const x = 50 + c * (128 + row * 8) + r() * 24;
          const y = 585 + row * 56;
          houses.push(
            <g key={`${row}-${c}`}>
              <rect x={x.toFixed(0)} y={y} width={w} height={h} fill="#cdbb92" opacity={0.55 + row * 0.1} />
              <path
                d={`M${(x - 5).toFixed(0)} ${y} L${(x + w / 2).toFixed(0)} ${y - 18 - row * 3} L${(x + w + 5).toFixed(0)} ${y}Z`}
                fill={(row + c) % 2 ? "#9e3f2a" : "#b8602f"}
              />
            </g>,
          );
        }
      }
      return (
        <>
          <Sun uid={uid} t={t} x={260} y={230} r={44} />
          <Ridge t={t} i={0} seed={14} base={430} amp={150} />
          <Mist uid={uid} y={480} />
          <Ridge t={t} i={1} seed={27} base={520} amp={120} />
          <path d={ridgePath(8, 570, 30)} fill={t.ridges[2]} />
          {houses}
          <Mist uid={uid} y={700} reverse />
          <path d={ridgePath(31, 765, 22)} fill={t.ground} />
        </>
      );
    }

    case "temple":
      return (
        <>
          <Sun uid={uid} t={t} x={600} y={210} r={74} />
          <g stroke={t.sun} strokeWidth="3" opacity="0.5">
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={(600 + Math.cos(a) * 96).toFixed(1)}
                  y1={(210 + Math.sin(a) * 96).toFixed(1)}
                  x2={(600 + Math.cos(a) * 140).toFixed(1)}
                  y2={(210 + Math.sin(a) * 140).toFixed(1)}
                />
              );
            })}
          </g>
          <Ridge t={t} i={0} seed={9} base={470} amp={110} />
          <Mist uid={uid} y={500} />
          <rect x="0" y="360" width="1200" height="440" fill={t.ridges[2]} />
          <Masonry seed={4} x={0} y={380} w={1200} rows={8} rowH={52} fill="#6d6070" stroke={t.ground} />
          <rect x="0" y="340" width="1200" height="26" fill="#c8902e" />
          <path
            d={`M0 366 ${Array.from({ length: 24 }, (_, i) => `H${i * 50 + 25} v-12 H${i * 50 + 50} v12`).join(" ")}`}
            fill="#c8902e"
          />
          <path d="M520 800 L546 430 L654 430 L680 800Z" fill={t.ground} />
          <path d="M546 430 L654 430" stroke="#c8902e" strokeWidth="10" />
          <path d="M150 640 L170 540 L240 540 L260 640Z" fill={t.ground} />
          <path d="M940 640 L960 540 L1030 540 L1050 640Z" fill={t.ground} />
        </>
      );

    case "road":
      return (
        <>
          <Sun uid={uid} t={t} x={340} y={260} r={54} />
          <Condor x={760} y={170} color={t.ground} />
          <Ridge t={t} i={0} seed={17} base={430} amp={170} />
          <Mist uid={uid} y={480} />
          <Ridge t={t} i={1} seed={29} base={510} amp={140} />
          <Ridge t={t} i={2} seed={43} base={590} amp={90} />
          <path
            d="M470 800 C420 700 690 650 610 560 S668 470 676 440 L690 440 C684 470 760 520 700 570 S880 700 790 800Z"
            fill="#8b7a63"
          />
          <path
            d="M625 800 C560 690 700 650 658 560 S683 470 683 440"
            fill="none"
            stroke="#e9e2d0"
            strokeWidth="3"
            strokeDasharray="3 15"
            opacity="0.6"
          />
          <path d={ridgePath(61, 770, 26)} fill={t.ground} />
          <g
            transform="translate(652 600) scale(0.9)"
            stroke={t.ground}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          >
            <circle cx="0" cy="-26" r="5" fill={t.ground} />
            <path d="M0 -20 L0 -4 M0 -4 L-7 10 M0 -4 L8 8 M0 -16 L-8 -8 M0 -16 L9 -20" />
          </g>
        </>
      );

    case "ruins":
      return (
        <>
          <Stars />
          <Sun uid={uid} t={t} x={880} y={190} r={34} />
          <Ridge t={t} i={0} seed={21} base={460} amp={150} />
          <Mist uid={uid} y={500} />
          <Ridge t={t} i={1} seed={33} base={540} amp={130} />
          <Mist uid={uid} y={600} reverse />
          <Ridge t={t} i={2} seed={47} base={620} amp={90} />
          <path
            d="M120 800 V560 H210 V520 H330 V570 H420 V500 H520 V800Z"
            fill={t.ridges[3]}
          />
          <Masonry seed={12} x={120} y={560} w={400} rows={4} rowH={48} fill="#3f5a4f" stroke={t.ground} />
          <path d="M700 800 V610 H780 V570 H900 V620 H1010 V800Z" fill={t.ridges[3]} />
          <Masonry seed={18} x={700} y={620} w={310} rows={4} rowH={44} fill="#3f5a4f" stroke={t.ground} />
          <g fill="none" stroke="#6f8f6b" strokeWidth="3" strokeLinecap="round" opacity="0.8">
            <path d="M210 520 C190 580 240 600 220 680" />
            <path d="M330 570 C350 620 310 650 330 720" />
            <path d="M780 570 C760 640 800 660 780 740" />
            <path d="M900 620 C920 670 880 700 900 760" />
          </g>
          <path d={ridgePath(71, 770, 30)} fill={t.ground} />
        </>
      );

    case "machu":
      return (
        <>
          <Sun uid={uid} t={t} x={300} y={250} r={46} />
          <Ridge t={t} i={0} seed={5} base={470} amp={160} />
          <Mist uid={uid} y={500} />
          <Ridge t={t} i={1} seed={19} base={540} amp={120} />
          <path d="M690 800 L820 360 L900 230 L960 330 L1010 420 L1200 800Z" fill={t.ridges[2]} />
          <path d="M900 230 L960 330 L1010 420 L930 380Z" fill={t.ridges[0]} opacity="0.5" />
          <Mist uid={uid} y={610} reverse />
          {Array.from({ length: 9 }, (_, i) => {
            const y = 520 + i * 30;
            const w = 620 - i * 20;
            return (
              <g key={i}>
                <path d={`M0 ${y} L${w} ${y} L${w + 40} ${y + 30} L0 ${y + 30}Z`} fill={i % 2 ? t.ridges[2] : t.ridges[3]} />
                <path d={`M0 ${y} L${w} ${y}`} stroke={t.mist} strokeOpacity="0.3" strokeWidth="2" />
              </g>
            );
          })}
          {[90, 170, 260, 340, 440, 520].map((x, i) => (
            <g key={x}>
              <rect x={x} y={500 - (i % 2) * 6} width="44" height="22" fill="#cdbb92" opacity="0.8" />
              <path d={`M${x - 4} ${500 - (i % 2) * 6} L${x + 22} ${482 - (i % 2) * 6} L${x + 48} ${500 - (i % 2) * 6}Z`} fill="#9e3f2a" />
            </g>
          ))}
          <path d={ridgePath(81, 785, 18)} fill={t.ground} />
        </>
      );

    case "terraces": {
      return (
        <>
          <Sun uid={uid} t={t} x={900} y={180} r={52} />
          <Ridge t={t} i={0} seed={25} base={300} amp={120} />
          {Array.from({ length: 12 }, (_, i) => {
            const y = 300 + i * 46;
            const amp = 30 + i * 3;
            const d = `M-50 ${y} C250 ${y - amp} 700 ${y + amp} 1250 ${y - 10} L1250 820 L-50 820Z`;
            return (
              <g key={i}>
                <path d={d} fill={mix(t.ridges[1], t.ground, i / 11)} />
                <path
                  d={`M-50 ${y} C250 ${y - amp} 700 ${y + amp} 1250 ${y - 10}`}
                  fill="none"
                  stroke={t.mist}
                  strokeOpacity={0.22 - i * 0.012}
                  strokeWidth="2.5"
                />
              </g>
            );
          })}
          <Mist uid={uid} y={430} />
          <Mist uid={uid} y={640} reverse />
        </>
      );
    }

    case "plaza":
      return (
        <>
          <Sun uid={uid} t={t} x={240} y={460} r={70} />
          <Ridge t={t} i={0} seed={13} base={470} amp={90} />
          <Mist uid={uid} y={520} />
          <rect x="0" y="520" width="1200" height="230" fill={t.ridges[2]} />
          <rect x="0" y="498" width="1200" height="26" fill="#7a2b2b" />
          {Array.from({ length: 9 }, (_, i) => {
            const x = 50 + i * 128;
            return <path key={i} d={`M${x} 750 V650 A35 35 0 0 1 ${x + 70} 650 V750Z`} fill={t.ground} />;
          })}
          <rect x="860" y="300" width="120" height="220" fill={t.ridges[1]} />
          <path d="M850 300 L920 232 L990 300Z" fill="#7a2b2b" />
          <path d="M890 360 V338 A30 30 0 0 1 950 338 V360Z" fill={t.ground} />
          <path d="M920 232 V204 M908 216 H932" stroke={t.mist} strokeWidth="3" />
          <rect x="0" y="750" width="1200" height="50" fill={t.ground} />
          <path d="M0 775 H1200 M200 750 V800 M520 750 V800 M840 750 V800 M1060 750 V800" stroke={t.ridges[3]} strokeWidth="2" />
        </>
      );
  }
}

interface ArtworkProps {
  variant: ArtVariant;
  className?: string;
}

export function Artwork({ variant, className }: ArtworkProps) {
  const uid = useId().replace(/:/g, "");
  const t = TONES[SCENE_TONE[variant]];

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-full w-full"}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.sky[0]} />
          <stop offset="0.55" stopColor={t.sky[1]} />
          <stop offset="1" stopColor={t.sky[2]} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor={t.sun} stopOpacity="0.55" />
          <stop offset="1" stopColor={t.sun} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-mist`}>
          <stop offset="0" stopColor={t.mist} stopOpacity="0.55" />
          <stop offset="1" stopColor={t.mist} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill={`url(#${uid}-sky)`} />
      {t.stars && <Stars />}
      {renderScene(variant, t, uid)}
    </svg>
  );
}
