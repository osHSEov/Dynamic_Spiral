import { useRef, type KeyboardEvent } from 'react';
import { levels } from '../content/levels';
import type { LevelId } from '../content/types';

interface LevelSelectorProps {
  selected: LevelId;
  onSelect: (id: LevelId) => void;
}

/**
 * Plain HTML buttons for every level: the keyboard and screen-reader path,
 * and the main selector on small screens. Each button stays in the tab
 * order; arrow keys, Home and End also move between them as a convenience.
 */
export function LevelSelector({ selected, onSelect }: LevelSelectorProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % levels.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + levels.length) % levels.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = levels.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onSelect(levels[next]!.id);
    refs.current[next]?.focus();
  };

  return (
    <div className="selector" role="group" aria-label="Choose a level">
      {levels.map((lv, i) => {
        const isSel = lv.id === selected;
        return (
          <button
            key={lv.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            className={`selector__btn ${isSel ? 'is-selected' : ''}`}
            aria-pressed={isSel}
            aria-controls="level-panel"
            onClick={() => onSelect(lv.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            style={{ ['--lv' as string]: lv.colors.base, ['--lv-deep' as string]: lv.colors.deep }}
          >
            <span className="selector__num">{lv.order}</span>
            <span className="swatch" aria-hidden="true" />
            <span className="selector__name">{lv.colorLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
