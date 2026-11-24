"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/cn";
import { EASE_EXPO_OUT } from "@/lib/motion-config";

interface RevealTextProps {
  text: string;
  /** Elemento HTML. Padrão: parágrafo. Use "h1", "h2" e assim por diante. */
  as?: ElementType;
  id?: string;
  className?: string;
  wordClassName?: string;
  /** "inView" revela ao rolar até o texto. "mount" revela ao carregar (para o topo). */
  trigger?: "inView" | "mount";
  delay?: number;
  stagger?: number;
}

/**
 * As palavras sobem de uma linha recortada, uma após a outra, saindo do
 * desfoque. O texto visível é dividido em palavras para animar, e uma cópia
 * só para leitores de tela mantém o título legível como uma frase inteira.
 */
export function RevealText({
  text,
  as: Tag = "p",
  id,
  className,
  wordClassName,
  trigger = "inView",
  delay = 0,
  stagger = 0.05,
}: RevealTextProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  const wordVariants: Variants = {
    hidden: { y: "105%", filter: "blur(10px)" },
    visible: {
      y: "0%",
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: EASE_EXPO_OUT },
    },
  };

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={containerVariants}
        initial="hidden"
        {...triggerProps}
      >
        {words.map((word, i) => (
          <span
            key={`${i}-${word}`}
            className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
          >
            <motion.span className={cn("inline-block", wordClassName)} variants={wordVariants}>
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
