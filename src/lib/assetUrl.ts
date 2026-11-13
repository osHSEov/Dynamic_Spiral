/**
 * Resolve a content asset path (e.g. "assets/levels/01-beige.png") against
 * Vite's base URL. With `base: './'` this stays relative, so the built site
 * works from any folder or sub-path.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? base + path : `${base}/${path}`;
}
