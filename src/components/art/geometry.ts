/** Gerador pseudoaleatório com semente: o mesmo resultado no servidor e no navegador. */
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Cria o contorno de uma cordilheira. A cena padrão tem 1200 de largura e 800 de altura. */
export function ridgePath(
  seed: number,
  base: number,
  amp: number,
  steps = 16,
  bottom = 800,
  width = 1200,
): string {
  const r = rng(seed);
  let d = `M0 ${bottom} L0 ${base}`;
  for (let i = 1; i <= steps; i++) {
    const x = (width / steps) * i;
    const spike = i % 4 === 0 ? 1.5 : 1;
    d += ` L${x.toFixed(0)} ${(base - r() * amp * spike).toFixed(0)}`;
  }
  return `${d} L${width} ${bottom} Z`;
}

/** Mistura duas cores hexadecimais (k = 0 devolve a primeira, k = 1 a segunda). */
export function mix(a: string, b: string, k: number): string {
  const parse = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const c = (x: number, y: number) =>
    Math.round(x + (y - x) * k)
      .toString(16)
      .padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
}
