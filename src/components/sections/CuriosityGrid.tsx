import { BlurReveal } from "@/components/motion/BlurReveal";
import { CuriosityCard } from "@/components/motion/CuriosityCard";
import type { Curiosity, SectionCopy } from "@/data/types";
import { SectionHeader } from "./SectionHeader";

interface CuriosityGridProps {
  curiosities: Curiosity[];
  copy: SectionCopy;
  labels: { open: string; close: string };
}

export function CuriosityGrid({ curiosities, copy, labels }: CuriosityGridProps) {
  return (
    <section id="curiosidades" aria-labelledby="curiosidades-titulo" className="py-32">
      <div className="container">
        <SectionHeader id="curiosidades-titulo" title={copy.title} description={copy.description} />
        <ul className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {curiosities.map((curiosity, i) => (
            <li key={curiosity.id}>
              <BlurReveal delay={(i % 3) * 0.1}>
                <CuriosityCard
                  curiosity={curiosity}
                  openLabel={labels.open}
                  closeLabel={labels.close}
                />
              </BlurReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
