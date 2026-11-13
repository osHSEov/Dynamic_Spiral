import { levels } from '../content/levels';
import { hero } from '../content/site';

/**
 * Opening diagram: eight open rings stacked on a vertical axis, widening as
 * they rise, with an unclosed continuation above the top ring. It avoids the
 * closed apex of a pyramid on purpose: Graves's model is open-ended.
 *
 * Desktop/tablet: full SVG with labels in three columns.
 * Narrow screens: the SVG is replaced by an ordered list with the same data.
 * The list is always available to screen readers.
 */

const W = 900;
const ROW = 64;
const TIER_GAP = 34; // extra room above F–S for the tier annotation
const TOP = 170; // space for the open continuation and column headers
const H = TOP + ROW * levels.length + TIER_GAP + 30;
const AX = 215; // ring axis
const COL_CODE = 452;
const COL_NAME = 526;
const COL_COLOR = 778;

export function ValueSystemsDiagram() {
  const n = levels.length;
  const rows = levels.map((lv, i) => {
    const idxFromTop = n - 1 - i;
    const y = TOP + ROW * idxFromTop + ROW / 2 + (i < 6 ? TIER_GAP : 0);
    const rx = 64 + (i / (n - 1)) * 124;
    const ry = rx * 0.2;
    return { lv, i, y, rx, ry };
  });
  const tierY = TOP + ROW * (n - 6) + TIER_GAP * 0.62; // between G–T (7th) and F–S (6th)
  const topRing = rows[n - 1]!;

  return (
    <figure className="vs-diagram" aria-labelledby="vs-title">
      <figcaption className="vs-diagram__caption">
        <h2 id="vs-title" className="vs-diagram__title">
          {hero.diagramTitle}
        </h2>
        <p className="vs-diagram__subtitle">{hero.diagramSubtitle}</p>
      </figcaption>

      <svg className="vs-diagram__svg" viewBox={`0 0 ${W} ${H}`} role="presentation" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="vs-axis" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#1D1A16" stopOpacity="0.55" />
            <stop offset="0.85" stopColor="#1D1A16" stopOpacity="0.35" />
            <stop offset="1" stopColor="#1D1A16" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Column headers */}
        <g className="vs-head">
          <text x={COL_CODE} y={TOP - 18}>Graves</text>
          <text x={COL_NAME} y={TOP - 18}>Graves’s name</text>
          <text x={COL_COLOR} y={TOP - 18}>Later color label</text>
          <line x1={COL_CODE} x2={W - 8} y1={TOP - 8} y2={TOP - 8} className="vs-rule" />
        </g>

        {/* Axis, open at the top */}
        <line x1={AX} x2={AX} y1={TOP - 150} y2={H - 16} stroke="url(#vs-axis)" strokeWidth="1.5" />
        <path d={`M ${AX - 6} ${TOP - 138} L ${AX} ${TOP - 152} L ${AX + 6} ${TOP - 138}`} fill="none" stroke="#1D1A16" strokeOpacity="0.35" strokeWidth="1.5" />

        {/* Open continuation above the last ring */}
        {[1, 2].map((k) => {
          const rx = topRing.rx + k * 16;
          const y = topRing.y - k * ROW * 0.72;
          return (
            <ellipse key={k} cx={AX} cy={y} rx={rx} ry={rx * 0.2} fill="none" stroke="#1D1A16" strokeOpacity={0.28 - k * 0.08} strokeDasharray="3 7" strokeWidth="1.5" />
          );
        })}
        <text x={AX + 18} y={TOP - 140} className="vs-note" textAnchor="start">
          {hero.openEnded.split(':')[0]}
        </text>
        <text x={AX + 18} y={TOP - 122} className="vs-note vs-note--soft" textAnchor="start">
          {hero.openEnded.split(':')[1]?.trim()}
        </text>

        {/* Back halves first, then front halves, so rings read as layered */}
        {rows.map(({ lv, y, rx, ry }) => (
          <path
            key={`b-${lv.id}`}
            d={`M ${AX - rx} ${y} A ${rx} ${ry} 0 0 1 ${AX + rx} ${y}`}
            fill="none"
            stroke={lv.colors.base}
            strokeOpacity="0.38"
            strokeWidth="9"
            strokeLinecap="round"
          />
        ))}
        {rows.map(({ lv, y, rx, ry }) => (
          <g key={`f-${lv.id}`}>
            <ellipse cx={AX} cy={y} rx={rx} ry={ry} fill={lv.colors.base} fillOpacity="0.07" />
            <path
              d={`M ${AX - rx} ${y} A ${rx} ${ry} 0 0 0 ${AX + rx} ${y}`}
              fill="none"
              stroke={lv.colors.base}
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d={`M ${AX - rx + 6} ${y + 2} A ${rx - 6} ${ry - 2} 0 0 0 ${AX + rx - 6} ${y + 2}`}
              fill="none"
              stroke="#FFFDF8"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* Tier boundary */}
        <line x1={24} x2={W - 8} y1={tierY} y2={tierY} className="vs-tier" />
        <text x={COL_CODE} y={tierY - 8} className="vs-tier-label">
          ↑ {hero.tierNote.graves}
        </text>
        <text x={COL_CODE} y={tierY + 17} className="vs-tier-label vs-tier-label--sd">
          ↑ {hero.tierNote.sd}
        </text>

        {/* Labels */}
        {rows.map(({ lv, y, rx }) => (
          <g key={`l-${lv.id}`} className="vs-row">
            <line x1={AX + rx + 14} x2={COL_CODE - 14} y1={y} y2={y} className="vs-leader" />
            <circle cx={AX + rx + 14} cy={y} r="2.5" fill={lv.colors.deep} />
            <text x={COL_CODE} y={y + 6} className="vs-code">
              {lv.graves.code}
            </text>
            <text x={COL_NAME} y={y + 6} className="vs-name">
              {lv.graves.name}
            </text>
            <rect x={COL_COLOR} y={y - 9} width="18" height="18" rx="3" fill={lv.colors.base} />
            <text x={COL_COLOR + 26} y={y + 5} className="vs-color">
              {lv.colorLabel}
            </text>
          </g>
        ))}
      </svg>

      {/* Text version: visible on narrow screens, always read by screen readers */}
      <ol className="vs-list" reversed>
        {[...levels].reverse().map((lv) => (
          <li key={lv.id} className="vs-list__item" style={{ ['--lv' as string]: lv.colors.base }}>
            <span className="vs-list__code">{lv.graves.code}</span>
            <span className="vs-list__name">{lv.graves.name}</span>
            <span className="vs-list__color">
              <span className="swatch" aria-hidden="true" />
              <span className="visually-hidden">later color label: </span>
              {lv.colorLabel}
            </span>
            {lv.order === 7 && <span className="vs-list__tier">{hero.tierNote.graves}. {hero.tierNote.sd}.</span>}
          </li>
        ))}
      </ol>
    </figure>
  );
}
