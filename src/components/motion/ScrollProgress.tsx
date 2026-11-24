"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra de 3 px fixa no topo da tela, mostrando quanto da página já foi lida.
 * Uma mola suaviza o valor para que ela nunca trema.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ember via-accent to-accent"
    />
  );
}
