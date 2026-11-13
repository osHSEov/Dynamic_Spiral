import { useMemo, useState } from 'react';
import { levels } from '../content/levels';
import type { LevelId } from '../content/types';
import { buildSpiral, type SpiralOptions } from '../lib/spiralGeometry';
import { mix, shade } from '../lib/color';

interface SpiralProps {
  selected: LevelId;
  onSelect: (id: LevelId) => void;
  /** Compact mode drops the outside labels and shows number badges instead. */
  compact?: boolean;
}

const PAPER = '#F6F1E7';

const FULL: SpiralOptions = {
  levelCount: levels.length,
  width: 620,
  height: 680,
  cx: 215,
  cy: 345,
  r0: 58,
  r1: 172,
  rise: 480,
  band: 34,
  spanDeg: 338,
  gapDeg: 22,
  elevationDeg: 22,
  slices: 48,
  startDeg: -79,
  emphasisOffset: 10,
};

const COMPACT: SpiralOptions = { ...FULL, width: 420, cx: 210, height: 640, cy: 335 };

/**
 * Interactive organizational spiral (mouse / touch).
 *
 * Keyboard and screen-reader users select levels with the ordinary HTML
 * buttons rendered next to the spiral (see LevelSelector); the SVG itself is
 * exposed as a single labelled image so it is not announced as 240 shapes.
 */
export function Spiral({ selected, onSelect, compact = false }: SpiralProps) {
  const opts = compact ? COMPACT : FULL;
  const selIdx = levels.findIndex((l) => l.id === selected);
  const geo = useMemo(() => buildSpiral({ ...opts, emphasize: selIdx }), [opts, selIdx]);
  const [hover, setHover] = useState<number | null>(null);

  const fillFor = (lv: number, light: number) => {
    const base = levels[lv]!.colors.base;
    let c = shade(base, light > 0 ? light * 0.45 : light);
    if (lv !== selIdx && lv !== hover) c = mix(c, PAPER, 0.36);
    if (lv === hover && lv !== selIdx) c = mix(c, PAPER, 0.12);
    return c;
  };

  const labelX = opts.cx + opts.r1 + 86;
  const pick = (lv: number) => onSelect(levels[lv]!.id);

  return (
    <svg
      className={`spiral ${compact ? 'spiral--compact' : ''}`}
      viewBox={`0 0 ${opts.width} ${opts.height}`}
      role="img"
      aria-label={`Spiral of eight levels, from Beige at the bottom to Turquoise at the top. Currently selected: ${levels[selIdx]?.colorLabel}. Use the level buttons to change the selection.`}
      onMouseLeave={() => setHover(null)}
    >
      <defs>
        <radialGradient id="spiral-shadow">
          <stop offset="0" stopColor="#1D1A16" stopOpacity="0.22" />
          <stop offset="1" stopColor="#1D1A16" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spiral-axis" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1D1A16" stopOpacity="0.45" />
          <stop offset="0.8" stopColor="#1D1A16" stopOpacity="0.25" />
          <stop offset="1" stopColor="#1D1A16" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse {...geo.shadow} fill="url(#spiral-shadow)" />
      <line x1={geo.axis.x} x2={geo.axis.x} y1={geo.axis.yTop} y2={geo.axis.yBottom} stroke="url(#spiral-axis)" strokeWidth="1.25" strokeDasharray="2 5" />

      <g className="spiral__ribbon">
        {geo.quads.map((q) => {
          const fill = fillFor(q.level, q.light);
          return (
            <polygon
              key={q.key}
              points={q.points}
              className={`spiral__quad ${q.level === selIdx ? 'is-selected' : ''}`}
              data-level={levels[q.level]!.id}
              style={{ fill, stroke: fill }}
              onClick={() => pick(q.level)}
              onMouseEnter={() => setHover(q.level)}
            />
          );
        })}
      </g>

      {!compact &&
        geo.anchors.map((a) => {
          const lv = levels[a.level]!;
          const isSel = a.level === selIdx;
          return (
            <g
              key={lv.id}
              className={`spiral__label ${isSel ? 'is-selected' : ''}`}
              onClick={() => pick(a.level)}
              onMouseEnter={() => setHover(a.level)}
            >
              <polyline
                points={`${a.x + 4},${a.y} ${labelX - 34},${a.y} ${labelX - 14},${a.labelY} ${labelX - 8},${a.labelY}`}
                className="spiral__leader"
                fill="none"
              />
              <circle cx={a.x + 4} cy={a.y} r="2.75" fill={lv.colors.deep} stroke="#FFFDF8" strokeWidth="1" />
              <rect x={labelX - 6} y={a.labelY - 18} width={opts.width - labelX} height="36" fill="transparent" />
              <text x={labelX} y={a.labelY - 1} className="spiral__name" style={isSel ? { fill: lv.colors.deep } : undefined}>
                <tspan className="spiral__num">{lv.order}</tspan> {lv.colorLabel}
              </text>
              <text x={labelX + 14} y={a.labelY + 14} className="spiral__sub">
                {lv.organization.principle}
              </text>
            </g>
          );
        })}

      {compact &&
        geo.anchors.map((a) => {
          const lv = levels[a.level]!;
          const isSel = a.level === selIdx;
          return (
            <g key={lv.id} className="spiral__badge" onClick={() => pick(a.level)} aria-hidden="true">
              <circle cx={a.frontX} cy={a.frontY} r={isSel ? 15 : 12} fill={isSel ? '#1D1A16' : '#FFFDF8'} stroke="#1D1A16" strokeWidth="1.25" />
              <text x={a.frontX} y={a.frontY + 4.5} textAnchor="middle" className="spiral__badge-text" fill={isSel ? '#FFFDF8' : '#1D1A16'}>
                {lv.order}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
