import { ridgePath } from "./geometry";

interface RidgeDividerProps {
  seed?: number;
  /** A cor vem do texto: use classes como text-panel ou text-canvas. */
  className?: string;
  flip?: boolean;
}

/** Faixa em forma de montanhas, usada para separar seções com um recorte natural. */
export function RidgeDivider({ seed = 3, className = "text-panel", flip = false }: RidgeDividerProps) {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-20 w-full md:h-28 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d={ridgePath(seed, 150, 120, 24, 200)} fill="currentColor" />
    </svg>
  );
}
