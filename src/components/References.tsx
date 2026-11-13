import { references } from '../content/site';
import { sources } from '../content/sources';

export function References() {
  return (
    <section id="sources" className="section references" aria-labelledby="ref-title">
      <div className="wrap">
        <header className="section__head">
          <p className="section__num">05</p>
          <h2 id="ref-title" className="section__title">
            {references.title}
          </h2>
        </header>

        <div className="refs__grid">
          <div className="caveats">
            {references.caveats.map((c) => (
              <div key={c.title} className="caveat">
                <h3 className="caveat__title">{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          <ol className="sources">
            {sources.map((s) => (
              <li key={s.key} className="source">
                <p className="source__label">{s.label}</p>
                <p className="source__cite">{s.citation}</p>
                <p className="source__role">{s.role}</p>
                {s.notes && <p className="source__notes">{s.notes}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
