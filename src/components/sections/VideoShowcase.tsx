"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";
import { MediaVisual } from "@/components/art/MediaVisual";
import { RidgeDivider } from "@/components/art/RidgeDivider";
import { AnimatedFrame } from "@/components/motion/AnimatedFrame";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import type { SectionCopy, VideoItem } from "@/data/types";
import { SectionHeader } from "./SectionHeader";

interface VideoShowcaseProps {
  videos: VideoItem[];
  copy: SectionCopy;
  labels: { play: string; openExternal: string; list: string };
}

/**
 * Cinema em quadro. O vídeo só é pedido ao YouTube depois do clique, o que
 * deixa a página leve e protege a privacidade de quem lê. Aceita também um
 * arquivo de vídeo local (campo `file` em content.ts).
 */
export function VideoShowcase({ videos, copy, labels }: VideoShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  const video = videos[index];
  const playing = playingId === video.id;
  const playable = Boolean(video.youtubeId || video.file);
  const externalUrl = video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : undefined;

  const select = (i: number) => {
    setIndex(i);
    setPlayingId(null);
  };

  return (
    <section
      id="documentarios"
      aria-labelledby="documentarios-titulo"
      className="relative mt-16 bg-panel pb-32"
    >
      <div className="absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)]">
        <RidgeDivider seed={7} className="text-panel" />
      </div>

      <div className="container pt-16">
        <SectionHeader id="documentarios-titulo" title={copy.title} description={copy.description} />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className={cn(videos.length > 1 ? "lg:col-span-8" : "lg:col-span-12")}>
            <BlurReveal>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-line/10 bg-canvas shadow-[0_0_80px_-20px_rgb(var(--accent-primary)/0.35)]">
                {playing && video.youtubeId ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : playing && video.file ? (
                  <video
                    className="absolute inset-0 h-full w-full bg-black"
                    src={asset(video.file)}
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <button
                    type="button"
                    disabled={!playable}
                    onClick={() => setPlayingId(video.id)}
                    aria-label={`${labels.play}: ${video.title}`}
                    className="group absolute inset-0 block h-full w-full text-left"
                  >
                    <span className="absolute inset-0 transition-transform duration-[1200ms] ease-expo group-hover:scale-105">
                      <MediaVisual media={{ art: video.art }} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/20 to-canvas/40" />
                    <span className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-4 text-sm text-ink/85">
                      <span>{video.title}</span>
                      <span className="text-ink/60">{video.source}</span>
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/70 bg-canvas/60 text-accent backdrop-blur-md"
                    >
                      <Play aria-hidden="true" className="ml-1 h-9 w-9 fill-current" />
                    </motion.span>
                  </button>
                )}
                {!playing && <AnimatedFrame />}
              </div>
            </BlurReveal>

            <BlurReveal delay={0.1} className="mt-8 max-w-2xl">
              <h3 className="font-display text-3xl text-ink">{video.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/70">{video.summary}</p>
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent"
                >
                  {labels.openExternal}
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
            </BlurReveal>
          </div>

          {videos.length > 1 && (
            <ul aria-label={labels.list} className="space-y-3 lg:col-span-4">
              {videos.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={i === index}
                    className={cn(
                      "w-full rounded-xl border p-5 text-left transition-colors",
                      i === index
                        ? "border-accent/60 bg-surface"
                        : "border-line/10 hover:border-line/30",
                    )}
                  >
                    <span className="block font-display text-xl text-ink">{item.title}</span>
                    <span className="mt-1 block text-sm text-ink/60">{item.source}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
