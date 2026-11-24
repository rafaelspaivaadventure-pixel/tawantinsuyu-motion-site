"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MediaVisual } from "@/components/art/MediaVisual";
import { RidgeDivider } from "@/components/art/RidgeDivider";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollBlur } from "@/components/motion/ScrollBlur";
import { EASE_EXPO_OUT } from "@/lib/motion-config";
import type { HeroContent } from "@/data/types";

interface HeroProps extends HeroContent {
  cta: string;
}

/**
 * Abertura em tela cheia, em camadas. O fundo desliza mais devagar que a
 * rolagem, a silhueta da frente sobe mais rápido, e o texto sobe, esmaece e
 * desfoca quando o leitor sai, para a página ter profundidade.
 */
export function Hero({ eyebrow, title, subtitle, media, cta }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const copyBlur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(14px)"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div
        role="img"
        aria-label={media.alt}
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-x-0 -bottom-[15%] -top-[15%] -z-20 will-change-transform"
      >
        <MediaVisual media={media} />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas/10 via-transparent to-canvas/70" />

      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: frontY }}
        className="absolute inset-x-0 bottom-[-2px] -z-10"
      >
        <RidgeDivider seed={9} className="text-canvas" />
      </motion.div>

      <motion.div
        style={
          reduce ? undefined : { y: copyY, opacity: copyOpacity, filter: copyBlur }
        }
        className="container relative pb-28 pt-48"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-base text-accent"
        >
          {eyebrow}
        </motion.p>

        <ScrollBlur max={6}>
          <RevealText
            as="h1"
            text={title}
            trigger="mount"
            className="mt-4 font-display text-fluid-hero text-ink"
          />
        </ScrollBlur>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 1.1, ease: EASE_EXPO_OUT }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-ink/85 md:text-xl"
        >
          {subtitle}
        </motion.p>

        <a
          href="#narrativa"
          className="mt-14 inline-flex items-center gap-3 text-sm text-ink/80 transition-colors hover:text-ink"
        >
          <ArrowDown aria-hidden="true" className="h-4 w-4 animate-scroll-hint" />
          {cta}
        </a>
      </motion.div>
    </section>
  );
}
