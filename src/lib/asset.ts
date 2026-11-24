/**
 * Prefixa caminhos de /public com o caminho base do GitHub Pages
 * (por exemplo /tawantinsuyu-motion-site). Em desenvolvimento o prefixo é vazio.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
