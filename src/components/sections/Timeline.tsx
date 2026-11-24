"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { cn } from "@/lib/cn";
import type { SectionCopy, TimelineMilestone } from "@/data/types";
import { SectionHeader } from "./SectionHeader";

interface TimelineProps {
  milestones: TimelineMilestone[];
  copy: SectionCopy;
}

/**
 * Crônica vertical. O fio central se preenche conforme o leitor rola.
 * No computador os marcos se alternam nos dois lados; no celular, empilham.
 */
export function Timeline({ milestones, copy }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 65%"],
  });

  return (
    <section id="cronologia" aria-labelledby="cronologia-titulo" className="py-32">
      <div className="container">
        <SectionHeader id="cronologia-titulo" title={copy.title} description={copy.description} />

        <div ref={trackRef} className="relative mt-24">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-0 w-px bg-line/15 md:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
            className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent md:left-1/2"
          />

          <ol className="space-y-28">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                alignRight={index % 2 === 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  milestone,
  alignRight,
}: {
  milestone: TimelineMilestone;
  alignRight: boolean;
}) {
  const isConflict = milestone.era === "Conquista" || milestone.era === "Resistência";

  return (
    <li className="relative pl-10 md:pl-0">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-2 h-3 w-3 rounded-full ring-8 ring-canvas md:left-1/2 md:-translate-x-1/2",
          isConflict ? "bg-ember" : "bg-accent",
        )}
      />

      <article className={cn("md:w-[calc(50%-3rem)]", alignRight && "md:ml-auto")}>
        <BlurReveal>
          <p className="flex flex-wrap items-baseline gap-x-4 text-sm">
            <span className="font-display text-2xl tabular-nums text-ink">{milestone.year}</span>
            <span className="text-ink/60">{milestone.era}</span>
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
            {milestone.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
            {milestone.summary}
          </p>
        </BlurReveal>
        {milestone.media && (
          <div className="mt-8">
            <ParallaxImage media={milestone.media} />
          </div>
        )}
      </article>
    </li>
  );
}
