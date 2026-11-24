"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";
import type { MediaAsset } from "@/data/types";
import { Artwork } from "./Artwork";

/**
 * Mostra a foto (media.src) se houver, e a ilustração (media.art) caso
 * contrário. Se a foto não carregar, a ilustração entra no lugar.
 */
export function MediaVisual({ media }: { media: Pick<MediaAsset, "art" | "src"> }) {
  const [failed, setFailed] = useState(false);

  if (media.src && !failed) {
    return (
      <Image
        src={asset(media.src)}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    );
  }
  return <Artwork variant={media.art} />;
}
