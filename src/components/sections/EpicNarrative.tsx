import { StickyStorySection } from "@/components/motion/StickyStorySection";
import type { SectionCopy, StoryChapter } from "@/data/types";
import { SectionHeader } from "./SectionHeader";

interface EpicNarrativeProps {
  chapters: StoryChapter[];
  copy: SectionCopy;
}

export function EpicNarrative({ chapters, copy }: EpicNarrativeProps) {
  return (
    <section id="narrativa" aria-labelledby="narrativa-titulo" className="pt-32">
      <div className="container mb-24">
        <SectionHeader id="narrativa-titulo" title={copy.title} description={copy.description} />
      </div>
      <StickyStorySection chapters={chapters} />
    </section>
  );
}
