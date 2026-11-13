import { dimensions, transition } from '../content/site';
import { levelById } from '../content/levels';
import type { LevelId } from '../content/types';

export function Transition({ onSelect }: { onSelect: (id: LevelId) => void }) {
  return (
    <section id="organizations" className="section transition" aria-labelledby="org-title">
      <div className="wrap">
        <header className="section__head">
          <p className="section__num">02</p>
          <h2 id="org-title" className="section__title">
            {transition.title}
          </h2>
          {transition.intro.map((t) => (
            <p key={t.slice(0, 20)} className="section__intro">
              {t}
            </p>
          ))}
        </header>

        <div className="dims">
          {dimensions.map((d) => (
            <article key={d.id} className="dim" aria-labelledby={`dim-${d.id}`}>
              <h3 id={`dim-${d.id}`} className="dim__title">
                {d.title}
              </h3>
              <p className="dim__q">{d.question}</p>
              <ul className="dim__samples">
                {transition.sampleLevels[d.id].map((id) => {
                  const lv = levelById[id];
                  const point = lv.dimensions[d.id];
                  return (
                    <li key={id} style={{ ['--lv' as string]: lv.colors.base, ['--lv-deep' as string]: lv.colors.deep }}>
                      <button type="button" className="dim__level" onClick={() => onSelect(id)}>
                        <span className="swatch" aria-hidden="true" />
                        {lv.colorLabel}
                        <span className="visually-hidden">: open in the spiral explorer</span>
                      </button>
                      <span className="dim__text">{point.text}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
