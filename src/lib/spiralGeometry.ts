/**
 * Geometry for the organizational spiral.
 *
 * The spiral is a helical ribbon wound around a vertical axis. It rises and
 * widens as it climbs (an open cone rather than a closed pyramid). Each level
 * owns one arc of the ribbon, separated from its neighbours by a small gap.
 *
 * The ribbon is cut into thin quads. Each quad is projected with a slightly
 * elevated perspective camera, shaded by a fixed light, and sorted back to
 * front (painter's algorithm), which gives a convincing 3D look in plain SVG.
 *
 * Pure function of its options: no DOM access, so it is easy to test and the
 * result can be memoized.
 */

export interface SpiralOptions {
  levelCount: number;
  /** SVG units. */
  width: number;
  height: number;
  /** Horizontal position of the axis. */
  cx: number;
  /** Vertical center of the spiral on screen. */
  cy: number;
  /** Radius at the bottom and at the top. */
  r0: number;
  r1: number;
  /** Vertical rise from the first to the last level, in 3D units. */
  rise: number;
  /** Ribbon height. */
  band: number;
  /** Degrees of arc per level, and gap between levels. */
  spanDeg: number;
  gapDeg: number;
  /** Camera elevation in degrees. */
  elevationDeg: number;
  /** Quads per level. */
  slices: number;
  /** Starting angle in degrees (0 = toward the right). */
  startDeg: number;
  /** Index of a level to push slightly outward (the selected one). */
  emphasize?: number;
  /** Outward offset for the emphasized level. */
  emphasisOffset?: number;
}

export interface Quad {
  key: string;
  level: number;
  points: string;
  depth: number;
  /** Which side of the ribbon is visible. */
  face: 'outer' | 'inner';
  /** Signed light value in roughly [-1, 1]; used to pick a shade. */
  light: number;
}

export interface LevelAnchor {
  level: number;
  /** Point where a label's leader line attaches (screen). */
  x: number;
  y: number;
  /** Evenly spaced label row position (screen), bottom level lowest. */
  labelY: number;
  /** A point on the visible front of this level, for number badges. */
  frontX: number;
  frontY: number;
}

export interface SpiralGeometry {
  quads: Quad[];
  anchors: LevelAnchor[];
  axis: { x: number; yTop: number; yBottom: number };
  shadow: { cx: number; cy: number; rx: number; ry: number };
}

const DEG = Math.PI / 180;

export function buildSpiral(o: SpiralOptions): SpiralGeometry {
  const phi = o.elevationDeg * DEG;
  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);
  const D = 1600; // perspective distance

  const step = o.spanDeg + o.gapDeg;
  const total = step * o.levelCount - o.gapDeg;

  // Light from the upper left, slightly toward the viewer.
  const L = normalize([-0.55, 0.55, 0.62]);

  /** Parameter u in [0, total] degrees along the ribbon. */
  const radiusAt = (u: number) => o.r0 + (o.r1 - o.r0) * (u / total);
  const heightAt = (u: number) => -o.rise / 2 + o.rise * (u / total);

  function project(u: number, lift: number, dr = 0) {
    const theta = (o.startDeg + u) * DEG;
    const r = radiusAt(u) + dr;
    const x3 = r * Math.cos(theta);
    const z3 = r * Math.sin(theta); // toward the viewer when positive
    const y3 = heightAt(u) + lift;
    const depth = y3 * sinP + z3 * cosP;
    const yUp = y3 * cosP - z3 * sinP;
    const f = D / (D - depth);
    return { x: o.cx + x3 * f, y: o.cy - yUp * f, depth, theta };
  }

  const quads: Quad[] = [];
  const anchors: LevelAnchor[] = [];

  for (let lv = 0; lv < o.levelCount; lv++) {
    const u0 = lv * step;
    const dr = lv === o.emphasize ? (o.emphasisOffset ?? 0) : 0;
    let best = { score: -Infinity, x: 0, y: 0 };
    let front = { z: -Infinity, x: 0, y: 0 };

    for (let s = 0; s < o.slices; s++) {
      const ua = u0 + (o.spanDeg * s) / o.slices;
      const ub = u0 + (o.spanDeg * (s + 1)) / o.slices;
      const a0 = project(ua, 0, dr);
      const b0 = project(ub, 0, dr);
      const b1 = project(ub, o.band, dr);
      const a1 = project(ua, o.band, dr);

      const mid = (ua + ub) / 2;
      const theta = (o.startDeg + mid) * DEG;
      const nx = Math.cos(theta);
      const nz = Math.sin(theta);
      // Outer face is visible when its normal points toward the camera.
      const facing = nz * cosP; // normal has no vertical component
      const face: Quad['face'] = facing >= 0 ? 'outer' : 'inner';
      const sign = face === 'outer' ? 1 : -1;
      const lambert = sign * (nx * L[0] + nz * L[2]);
      const light = face === 'outer' ? lambert * 0.75 - 0.05 : lambert * 0.45 - 0.42;

      quads.push({
        key: `${lv}-${s}`,
        level: lv,
        points: [a0, b0, b1, a1].map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '),
        depth: (a0.depth + b0.depth + a1.depth + b1.depth) / 4,
        face,
        light,
      });

      const m = project(mid, o.band / 2, dr);
      const zf = Math.sin(theta);
      // Prefer points on the visible front, then as far right as possible.
      const score = m.x + (zf > 0.05 ? 1000 : 0);
      if (score > best.score) best = { score, x: m.x, y: m.y };
      if (zf > front.z) front = { z: zf, x: m.x, y: m.y };
    }
    anchors.push({ level: lv, x: best.x, y: best.y, labelY: 0, frontX: front.x, frontY: front.y });
  }

  // Spread labels evenly between the lowest and highest attachment points.
  const ys = anchors.map((a) => a.y);
  const yTop = Math.min(...ys) - 6;
  const yBottom = Math.max(...ys) + 6;
  anchors.forEach((a, i) => {
    a.labelY = yBottom - ((yBottom - yTop) * i) / Math.max(1, o.levelCount - 1);
  });

  quads.sort((a, b) => a.depth - b.depth);

  const top = project(total, o.band);
  const bottom = project(0, 0);
  return {
    quads,
    anchors,
    axis: { x: o.cx, yTop: Math.min(top.y, o.cy - o.rise * cosP * 0.5) - 70, yBottom: bottom.y + 28 },
    shadow: { cx: o.cx, cy: o.cy + (o.rise / 2) * cosP + o.r0 * sinP + 26, rx: o.r0 * 1.9, ry: o.r0 * 0.42 },
  };
}

function normalize(v: [number, number, number]): [number, number, number] {
  const m = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / m, v[1] / m, v[2] / m];
}
