"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO_OUT } from "@/lib/motion-config";

/*
 * Os quatro lados do filete dourado, desenhados em sequência no sentido
 * horário. Cada lado é uma linha simples que cresce de uma ponta à outra.
 */
const SIDES = [
  { position: "left-0 top-0 h-[1.5px] w-full origin-left", axis: "x", delay: 0 },
  { position: "right-0 top-0 h-full w-[1.5px] origin-top", axis: "y", delay: 0.35 },
  { position: "bottom-0 right-0 h-[1.5px] w-full origin-right", axis: "x", delay: 0.7 },
  { position: "bottom-0 left-0 h-full w-[1.5px] origin-bottom", axis: "y", delay: 1.05 },
];

/** Cantos em degraus, inspirados na chakana (a cruz escalonada andina). */
const CORNERS = [
  "left-0 top-0",
  "right-0 top-0 rotate-90",
  "bottom-0 right-0 rotate-180",
  "bottom-0 left-0 -rotate-90",
];

/**
 * Moldura animada para imagens e vídeos. Ao entrar na tela, o filete dourado
 * é desenhado ao redor da imagem e os quatro cantos escalonados se acendem.
 */
export function AnimatedFrame() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3">
      {SIDES.map((side) => (
        <motion.span
          key={side.position}
          className={`absolute bg-accent/80 ${side.position}`}
          initial={reduce ? false : side.axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
          whileInView={side.axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: side.delay, ease: EASE_EXPO_OUT }}
        />
      ))}
      {CORNERS.map((position) => (
        <span key={position} className={`absolute h-7 w-7 ${position}`}>
          <motion.span
            className="block h-full w-full"
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_EXPO_OUT }}
          >
            <svg viewBox="0 0 28 28" className="h-full w-full overflow-visible" focusable="false">
              <path d="M1 27 V13 H13 V1 H27" className="fill-none stroke-accent" strokeWidth="2.5" />
            </svg>
          </motion.span>
        </span>
      ))}
    </div>
  );
}
