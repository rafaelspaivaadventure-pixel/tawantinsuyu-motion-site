interface SiteFooterProps {
  name: string;
  note: string;
  backToTop: string;
}

export function SiteFooter({ name, note, backToTop }: SiteFooterProps) {
  return (
    <footer className="border-t border-line/10 bg-canvas/80 py-16 backdrop-blur-sm">
      <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-3xl text-ink">{name}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">{note}</p>
        </div>
        <a href="#topo" className="text-sm text-ink/70 transition-colors hover:text-ink">
          {backToTop}
        </a>
      </div>
      <p className="container mt-10 text-xs text-ink/50">
        © {new Date().getFullYear()} {name}
      </p>
    </footer>
  );
}
