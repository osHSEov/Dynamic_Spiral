import { useCallback, useState } from 'react';
import { DEFAULT_LEVEL } from './content/levels';
import type { LevelId } from './content/types';
import { Hero } from './components/Hero';
import { Theory } from './components/Theory';
import { Transition } from './components/Transition';
import { Explorer } from './components/Explorer';
import { References } from './components/References';

export default function App() {
  const [selected, setSelected] = useState<LevelId>(DEFAULT_LEVEL);

  /** Used by the transition section: select a level and bring the explorer into view. */
  const openInExplorer = useCallback((id: LevelId) => {
    setSelected(id);
    const target = document.getElementById('explorer');
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    // Move focus to the panel heading so keyboard users land on the new content.
    window.setTimeout(() => {
      const h = document.querySelector<HTMLElement>('#level-panel h3');
      if (h) {
        h.setAttribute('tabindex', '-1');
        h.focus({ preventScroll: true });
      }
    }, reduce ? 0 : 450);
  }, []);

  return (
    <>
      <a className="skip-link" href="#explorer">
        Skip to the spiral explorer
      </a>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <span className="site-header__mark">Spiral Dynamics · Organizations</span>
          <nav aria-label="Sections">
            <ul className="site-nav">
              <li><a href="#theory">Theory</a></li>
              <li><a href="#organizations">Organizations</a></li>
              <li><a href="#explorer">Explorer</a></li>
              <li><a href="#sources">Sources</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Theory />
        <Transition onSelect={openInExplorer} />
        <Explorer selected={selected} onSelect={setSelected} />
        <References />
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <p>
            An educational, non-commercial overview prepared from preliminary research notes. Interpretive framework only; not a
            company assessment tool.
          </p>
        </div>
      </footer>
    </>
  );
}
