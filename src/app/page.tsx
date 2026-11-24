import { Credits } from "@/components/sections/Credits";
import { CuriosityGrid } from "@/components/sections/CuriosityGrid";
import { EpicNarrative } from "@/components/sections/EpicNarrative";
import { Hero } from "@/components/sections/Hero";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Timeline } from "@/components/sections/Timeline";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import {
  credits,
  curiosities,
  footerNote,
  heroContent,
  siteMeta,
  storyChapters,
  timelineMilestones,
  ui,
  videos,
} from "@/data/content";

/**
 * A página só monta as seções e entrega o conteúdo a elas.
 * Não guarda texto nem lógica de animação.
 */
export default function HomePage() {
  return (
    <>
      <a
        href="#narrativa"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-canvas"
      >
        {ui.skipLink}
      </a>

      <main id="topo">
        <Hero {...heroContent} cta={ui.heroCta} />
        <EpicNarrative chapters={storyChapters} copy={ui.narrative} />
        <Timeline milestones={timelineMilestones} copy={ui.timeline} />
        <VideoShowcase
          videos={videos}
          copy={ui.videos}
          labels={{
            play: ui.videoPlay,
            openExternal: ui.videoOpenExternal,
            list: ui.videoList,
          }}
        />
        <CuriosityGrid
          curiosities={curiosities}
          copy={ui.curiosities}
          labels={{ open: ui.curiosityOpen, close: ui.curiosityClose }}
        />
        <Credits title={ui.credits.title} thanks={ui.credits.thanks} people={credits} />
      </main>

      <SiteFooter name={siteMeta.name} note={footerNote} backToTop={ui.backToTop} />
    </>
  );
}
