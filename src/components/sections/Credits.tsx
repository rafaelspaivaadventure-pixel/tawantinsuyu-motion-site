import { Artwork } from "@/components/art/Artwork";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { RevealText } from "@/components/motion/RevealText";
import type { CreditPerson } from "@/data/types";

interface CreditsProps {
  title: string;
  thanks: string;
  people: CreditPerson[];
}

/** Créditos finais, com uma paisagem de terraços ao fundo que se dissolve nas bordas. */
export function Credits({ title, thanks, people }: CreditsProps) {
  return (
    <section
      id="creditos"
      aria-labelledby="creditos-titulo"
      className="relative isolate overflow-hidden py-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_70%,transparent)]"
      >
        <Artwork variant="terraces" />
      </div>

      <div className="container">
        <RevealText
          as="h2"
          id="creditos-titulo"
          text={title}
          className="font-display text-fluid-h2 text-ink"
        />

        <ul className="mt-20 space-y-14">
          {people.map((person, i) => (
            <li key={person.name}>
              <BlurReveal delay={i * 0.08}>
                <div className="border-t border-line/20 pt-8 md:grid md:grid-cols-12 md:items-baseline md:gap-8">
                  <p className="font-display text-5xl leading-none text-ink md:col-span-7 md:text-7xl">
                    {person.name}
                  </p>
                  <p className="mt-4 text-lg text-ink/75 md:col-span-5 md:mt-0">{person.roles}</p>
                </div>
              </BlurReveal>
            </li>
          ))}
        </ul>

        <BlurReveal className="mt-24" delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-ink/75">{thanks}</p>
        </BlurReveal>
      </div>
    </section>
  );
}
