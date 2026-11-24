"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { ReactNode } from "react";

interface ScrollBlurProps {
  children: ReactNode;
  className?: string;
  /** Desfoque máximo, em pixels, quando a rolagem está muito rápida. */
  max?: number;
}

/**
 * Desfoque de movimento ligado à velocidade da rolagem: quanto mais rápido o
 * leitor rola, mais o conteúdo borra. Parado ou devagar, não há filtro nenhum.
 */
export function ScrollBlur({ children, className, max = 4 }: ScrollBlurProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 90, damping: 28 });
  const filter = useTransform(smooth, (v) => {
    const amount = Math.min(Math.abs(v) / 2500, 1) * max;
    return amount < 0.25 ? "none" : `blur(${amount.toFixed(2)}px)`;
  });

  return (
    <motion.div className={className} style={reduce ? undefined : { filter }}>
      {children}
    </motion.div>
  );
}
