"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { MediaVisual } from "@/components/art/MediaVisual";
import type { MediaAsset } from "@/data/types";
import { AnimatedFrame } from "./AnimatedFrame";
import { ScrollBlur } from "./ScrollBlur";

interface ParallaxImageProps {
  media: MediaAsset;
  /** Deslocamento vertical, em % da altura. Mantenha em 6 ou menos para as bordas não aparecerem. */
  intensity?: number;
  aspectClassName?: string;
  className?: string;
}

/**
 * Figura cuja imagem desliza devagar contra a rolagem, com desfoque de
 * movimento quando a rolagem é rápida e uma moldura que se desenha ao entrar.
 * A imagem é maior que o quadro (inset -8%), então o movimento nunca mostra a borda.
 */
export function ParallaxImage({
  media,
  intensity = 6,
  aspectClassName = "aspect-[4/5] md:aspect-[16/11]",
  className,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, `${intensity}%`]);

  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-line/10 bg-panel", className)}>
      <div
        ref={frameRef}
        role="img"
        aria-label={media.alt}
        className={cn("relative overflow-hidden", aspectClassName)}
      >
        <ScrollBlur className="absolute inset-0" max={3}>
          <motion.div
            style={{ y: reduce ? "0%" : y }}
            className="absolute inset-[-8%] will-change-transform"
          >
            <MediaVisual media={media} />
          </motion.div>
        </ScrollBlur>
        <AnimatedFrame />
      </div>
      {(media.caption || media.credit) && (
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3 text-sm text-muted">
          <span>{media.caption}</span>
          {media.credit && <span className="text-xs opacity-70">{media.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
