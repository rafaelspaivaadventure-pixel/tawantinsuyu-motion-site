/**
 * Contratos de conteúdo. Os componentes importam estes tipos, nunca os textos,
 * então a interface serve para qualquer tema: basta trocar o content.ts.
 */

/** Cenas ilustradas disponíveis em src/components/art/Artwork.tsx. */
export type ArtVariant =
  | "andes"
  | "valley"
  | "temple"
  | "road"
  | "ruins"
  | "machu"
  | "terraces"
  | "plaza";

export interface MediaAsset {
  /** Cena ilustrada usada quando não há foto. */
  art: ArtVariant;
  alt: string;
  caption?: string;
  /** Fotógrafo e licença, se usar uma foto. */
  credit?: string;
  /**
   * Opcional. Caminho de uma foto dentro de /public, por exemplo
   * "/media/inca/machu-picchu.jpg". Se existir, substitui a ilustração.
   * Se o arquivo não carregar, a ilustração volta sozinha.
   */
  src?: string;
}

export interface SiteMeta {
  name: string;
  lang: string;
  title: string;
  description: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  media: MediaAsset;
}

export interface StoryChapter {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  media: MediaAsset;
}

export type TimelineEra =
  | "Formação"
  | "Expansão"
  | "Apogeu"
  | "Conquista"
  | "Resistência";

export interface TimelineMilestone {
  id: string;
  year: string;
  startYear: number;
  era: TimelineEra;
  title: string;
  summary: string;
  media?: MediaAsset;
}

export interface Curiosity {
  id: string;
  category: string;
  title: string;
  teaser: string;
  detail: string;
}

export interface VideoItem {
  id: string;
  title: string;
  summary: string;
  /** Canal ou autor do vídeo. */
  source: string;
  /** ID do YouTube: o trecho depois de "watch?v=" no endereço. */
  youtubeId?: string;
  /** Alternativa ao YouTube: arquivo em /public, por exemplo "/media/inca/video.mp4". */
  file?: string;
  /** Ilustração mostrada antes de o vídeo começar. */
  art: ArtVariant;
}

export interface CreditPerson {
  name: string;
  roles: string;
}

export interface SectionCopy {
  title: string;
  description: string;
}

export interface UiText {
  skipLink: string;
  heroCta: string;
  backToTop: string;
  curiosityOpen: string;
  curiosityClose: string;
  videoPlay: string;
  videoOpenExternal: string;
  videoList: string;
  narrative: SectionCopy;
  timeline: SectionCopy;
  videos: SectionCopy;
  curiosities: SectionCopy;
  credits: { title: string; thanks: string };
}
