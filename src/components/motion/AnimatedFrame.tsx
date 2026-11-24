"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { EASE_EXPO_OUT } from "@/lib/motion-config";

/*
 * O Framer Motion anima `pathLength` em qualquer forma SVG, mas os tipos dele
 * só reconhecem a propriedade em <path>. Por isso os estados do filete ficam
 * aqui, com o tipo ajustado.
 */
const STROKE_HIDDEN = { pathLength: 0, opacity: 0 } as unknown as TargetAndTransition;
const STROKE_DRAWN = { pathLength: 1, opacity: 0.85 } as unknown as TargetAndTransition;

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
      <svg className="absolute inset-0 h-full w-full overflow-visible" focusable="false">
        <motion.rect
          x="0.5"
          y="0.5"
          width="99.6%"
          height="99.6%"
          rx="8"
          className="fill-none stroke-accent"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : STROKE_HIDDEN}
          whileInView={STROKE_DRAWN}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.8, ease: EASE_EXPO_OUT }}
        />
      </svg>
      {CORNERS.map((position) => (
        <span key={position} className={`absolute h-7 w-7 ${position}`}>
          <motion.svg
            viewBox="0 0 28 28"
            className="h-full w-full overflow-visible"
            focusable="false"
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_EXPO_OUT }}
          >
            <path d="M1 27 V13 H13 V1 H27" className="fill-none stroke-accent" strokeWidth="2.5" />
          </motion.svg>
        </span>
      ))}
    </div>
  );
}
