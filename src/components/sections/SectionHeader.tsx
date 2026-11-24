import { RevealText } from "@/components/motion/RevealText";
import { BlurReveal } from "@/components/motion/BlurReveal";

interface SectionHeaderProps {
  id: string;
  title: string;
  description?: string;
}

/** Cabeçalho padrão das seções: título que sobe do desfoque e texto de apoio. */
export function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <header className="max-w-3xl">
      <RevealText as="h2" id={id} text={title} className="font-display text-fluid-h2 text-ink" />
      {description && (
        <BlurReveal delay={0.25}>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">{description}</p>
        </BlurReveal>
      )}
    </header>
  );
}
