"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_EXPO_OUT } from "@/lib/motion-config";
import { MediaVisual } from "@/components/art/MediaVisual";
import type { StoryChapter } from "@/data/types";
import { ParallaxImage } from "./ParallaxImage";

interface StickyStorySectionProps {
  chapters: StoryChapter[];
}

/**
 * Narrativa dividida. O texto rola na coluna da direita, e a imagem fixa na
 * esquerda troca, com desfoque, para o capítulo que está no meio da tela.
 * No celular a coluna fixa some e cada capítulo traz a própria imagem.
 */
export function StickyStorySection({ chapters }: StickyStorySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const handleActivate = useCallback((index: number) => setActiveIndex(index), []);
  const active = chapters[activeIndex];

  return (
    <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* No computador a imagem fixa é decorativa, então fica oculta para leitores de tela. */}
      <aside aria-hidden="true" className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-2xl border border-line/10 bg-panel">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.08, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1.2, ease: EASE_EXPO_OUT }}
              >
                <MediaVisual media={active.media} />
              </motion.div>
            </AnimatePresence>
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas to-transparent px-6 pb-5 pt-16 text-sm text-ink/80">
              {active.media.caption}
            </p>
          </div>
        </div>
      </aside>

      <ol className="lg:col-span-6">
        {chapters.map((chapter, index) => (
          <StoryStep
            key={chapter.id}
            index={index}
            isActive={index === activeIndex}
            onActivate={handleActivate}
          >
            <p className="text-base text-accent">{chapter.eyebrow}</p>
            <h3 className="mt-5 font-display text-5xl leading-[0.95] text-ink md:text-6xl">
              {chapter.title}
            </h3>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              {chapter.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 lg:hidden">
              <ParallaxImage media={chapter.media} aspectClassName="aspect-[4/3]" />
            </div>
          </StoryStep>
        ))}
      </ol>
    </div>
  );
}

interface StoryStepProps {
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
  children: ReactNode;
}

/**
 * Avisa o componente pai quando cruza a faixa central da tela. A faixa é uma
 * linha de 10% no meio, então só um capítulo fica ativo por vez.
 */
function StoryStep({ index, isActive, onActivate, children }: StoryStepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <li
      ref={ref}
      className={cn(
        "flex min-h-[85vh] flex-col justify-center py-24 transition-opacity duration-700",
        "lg:opacity-40",
        isActive && "lg:opacity-100",
      )}
    >
      {children}
    </li>
  );
}
