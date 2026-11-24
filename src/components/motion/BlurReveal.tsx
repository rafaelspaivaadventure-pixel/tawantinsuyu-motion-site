"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EXPO_OUT } from "@/lib/motion-config";

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial, em pixels. */
  y?: number;
}

/** O bloco entra saindo do desfoque, subindo um pouco e ganhando opacidade. */
export function BlurReveal({ children, className, delay = 0, y = 28 }: BlurRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE_EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}
