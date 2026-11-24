import { rng, ridgePath } from "./geometry";

/**
 * Fundo fixo da página inteira: luz de ouro e brasa, névoa em movimento,
 * montanhas muito discretas, poeira dourada subindo e uma textura fina de grão.
 * Fica atrás de tudo e não recebe cliques.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function SiteBackground() {
  const r = rng(7);
  const dust = Array.from({ length: 26 }, () => ({
    left: `${(r() * 100).toFixed(1)}%`,
    size: `${(1.5 + r() * 2.5).toFixed(1)}px`,
    duration: `${(16 + r() * 20).toFixed(1)}s`,
    delay: `${(-r() * 36).toFixed(1)}s`,
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 78% -10%, rgb(200 144 46 / 0.16), transparent 60%), radial-gradient(900px 600px at 5% 105%, rgb(158 47 42 / 0.18), transparent 65%), linear-gradient(180deg, rgb(var(--bg-primary)), rgb(var(--bg-secondary)))",
        }}
      />
      <div
        className="absolute -inset-[20%] animate-drift"
        style={{
          background:
            "radial-gradient(40% 30% at 30% 40%, rgb(233 226 208 / 0.06), transparent 70%), radial-gradient(35% 28% at 75% 65%, rgb(200 144 46 / 0.08), transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[55vh] w-full"
        focusable="false"
      >
        <path d={ridgePath(101, 470, 190)} fill="rgb(var(--text-primary) / 0.025)" />
        <path d={ridgePath(103, 580, 150)} fill="rgb(var(--text-primary) / 0.035)" />
        <path d={ridgePath(107, 680, 110)} fill="rgb(var(--text-primary) / 0.045)" />
      </svg>
      {dust.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-[-12px] animate-float-up rounded-full bg-accent"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            animationDuration: d.duration,
            animationDelay: d.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}
