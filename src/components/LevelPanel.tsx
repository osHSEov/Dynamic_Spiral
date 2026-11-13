import type { Level, SourcedPoint } from '../content/types';
import { ScreenshotFigure } from './ScreenshotFigure';

function Points({ title, items, id }: { title: string; items: SourcedPoint[]; id: string }) {
  return (
    <section className="panel__block" aria-labelledby={id}>
      <h4 id={id} className="panel__h">
        {title}
      </h4>
      <ul className="points">
        {items.map((p) => (
          <li key={p.text}>{p.text}</li>
        ))}
      </ul>
    </section>
  );
}

export function LevelPanel({ level }: { level: Level }) {
  const o = level.organization;
  const id = level.id;
  return (
    <article
      id="level-panel"
      className="panel"
      key={id}
      aria-labelledby={`panel-title-${id}`}
      style={{
        ['--lv' as string]: level.colors.base,
        ['--lv-deep' as string]: level.colors.deep,
        ['--lv-tint' as string]: level.colors.tint,
      }}
    >
      <header className="panel__head">
        <p className="panel__eyebrow">
          Level {level.order} of 8 <span aria-hidden="true">·</span> Graves {level.graves.code}
        </p>
        <h3 id={`panel-title-${id}`} className="panel__title">
          <span className="swatch swatch--lg" aria-hidden="true" />
          {level.colorLabel}
          <span className="panel__principle">
            <span className="visually-hidden">, organizing principle: </span>
            {o.principle}
          </span>
        </h3>
        <p className="panel__emphasis">
          <span className="panel__label">Organizational emphasis</span> {o.emphasis}
        </p>
      </header>

      <div className="panel__grid">
        <Points id={`${id}-lead`} title="Leadership and decision-making" items={o.leadership} />
        <Points id={`${id}-prac`} title="Organizational practices" items={o.practices} />
        <Points id={`${id}-str`} title="Strengths" items={o.strengths} />
        <Points id={`${id}-ten`} title="Recurring tensions and limitations" items={o.tensions} />
      </div>

      {o.caveat && (
        <p className="panel__caveat">
          <strong>Note on terms.</strong> {o.caveat}
        </p>
      )}

      <ScreenshotFigure level={level} />

      <section className="lenses" aria-labelledby={`${id}-lenses`}>
        <h4 id={`${id}-lenses`} className="panel__h">
          The same level in the other two layers
        </h4>
        <div className="lens">
          <p className="lens__src">
            I · Graves (1970) <span className="lens__code">{level.graves.code}</span>
          </p>
          <p className="lens__name">{level.graves.name}</p>
          <p>{level.graves.gist}</p>
        </div>
        <div className="lens">
          <p className="lens__src">II · Beck &amp; Cowan, via Dinan</p>
          <p className="lens__name">
            {level.colorLabel}: {level.spiralDynamics.theme}
          </p>
          <p>{level.spiralDynamics.paraphrase}</p>
        </div>
      </section>
    </article>
  );
}
