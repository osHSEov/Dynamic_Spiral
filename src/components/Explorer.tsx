import { levelById } from '../content/levels';
import { explorer } from '../content/site';
import type { LevelId } from '../content/types';
import { useMediaQuery } from '../lib/useMediaQuery';
import { LevelPanel } from './LevelPanel';
import { LevelSelector } from './LevelSelector';
import { Spiral } from './Spiral';

export function Explorer({ selected, onSelect }: { selected: LevelId; onSelect: (id: LevelId) => void }) {
  const compact = useMediaQuery('(max-width: 899px)');
  const level = levelById[selected];

  return (
    <section id="explorer" className="section explorer" aria-labelledby="explorer-title">
      <div className="wrap">
        <header className="section__head">
          <p className="section__num">03</p>
          <h2 id="explorer-title" className="section__title">
            {explorer.title}
          </h2>
          <p className="section__intro">{explorer.intro}</p>
        </header>

        <div className="explorer__grid">
          <div className="explorer__nav">
            <div className="explorer__sticky">
              <Spiral selected={selected} onSelect={onSelect} compact={compact} />
              <LevelSelector selected={selected} onSelect={onSelect} />
            </div>
          </div>

          <div className="explorer__panel">
            <p className="visually-hidden" aria-live="polite" aria-atomic="true">
              Showing {level.colorLabel}: {level.organization.principle}
            </p>
            <LevelPanel level={level} />
          </div>
        </div>
      </div>
    </section>
  );
}
