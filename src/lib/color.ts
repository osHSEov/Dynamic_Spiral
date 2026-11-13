/** Small color helpers for SVG shading. No dependencies. */

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}

/** Linear mix of two hex colors; `t` = 0 returns `a`, 1 returns `b`. */
export function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex([0, 1, 2].map((i) => ca[i]! + (cb[i]! - ca[i]!) * t) as RGB);
}

/**
 * Shade a base color. Positive `s` lightens toward white, negative darkens
 * toward a warm near-black, so shadows stay in the page's palette.
 */
export function shade(base: string, s: number): string {
  return s >= 0 ? mix(base, '#FFFDF8', Math.min(1, s)) : mix(base, '#1D1A16', Math.min(1, -s));
}
