"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO_OUT } from "@/lib/motion-config";
import type { Curiosity } from "@/data/types";

interface CuriosityCardProps {
  curiosity: Curiosity;
  openLabel: string;
  closeLabel: string;
}

const faceStyle: CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

/**
 * Cartão que vira para mostrar o detalhe. A interação é feita por botão, não
 * por hover, então funciona no toque e no teclado. A face virada para trás
 * recebe `inert`, o que a tira da ordem de foco e da leitura de tela.
 */
export function CuriosityCard({ curiosity, openLabel, closeLabel }: CuriosityCardProps) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const readRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const detailId = `${curiosity.id}-detalhe`;

  // Leva o foco para o botão que ficou visível. Sem isso, o foco se perderia
  // quando a face que o continha se tornasse inerte.
  const flip = (next: boolean) => {
    setFlipped(next);
    requestAnimationFrame(() => {
      (next ? closeRef : readRef).current?.focus({ preventScroll: true });
    });
  };

  return (
    <article className="h-80 [perspective:1400px]">
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: EASE_EXPO_OUT }}
      >
        <div
          inert={flipped}
          style={faceStyle}
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-line/10 bg-panel/90 p-8 backdrop-blur-sm"
        >
          <div>
            <p className="text-sm text-accent">{curiosity.category}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-ink">{curiosity.title}</h3>
          </div>
          <div>
            <p className="text-ink/70">{curiosity.teaser}</p>
            <button
              ref={readRef}
              type="button"
              onClick={() => flip(true)}
              aria-expanded={flipped}
              aria-controls={detailId}
              className="mt-6 text-sm text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent"
            >
              {openLabel}
            </button>
          </div>
        </div>

        <div
          id={detailId}
          inert={!flipped}
          style={{ ...faceStyle, transform: "rotateY(180deg)" }}
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-accent/30 bg-surface p-8"
        >
          <div>
            <p className="text-sm text-accent">{curiosity.category}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/90">{curiosity.detail}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => flip(false)}
            className="self-start text-sm text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent"
          >
            {closeLabel}
          </button>
        </div>
      </motion.div>
    </article>
  );
}
