import { assets, hero } from '../content/site';
import { SafeImage } from './SafeImage';
import { ValueSystemsDiagram } from './ValueSystemsDiagram';

export function Hero() {
  const p = assets.portrait;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__head wrap">
        <p className="kicker">{hero.kicker}</p>
        <h1 id="hero-title" className="hero__title">
          {hero.title}
        </h1>
        <p className="hero__lede">{hero.lede}</p>
      </div>

      <div className="hero__grid wrap">
        <aside className="hero__intro" aria-label="About Clare W. Graves">
          <figure className="portrait">
            <SafeImage
              path={p.src}
              width={p.width}
              height={p.height}
              alt={p.alt}
              filename={p.originalFilename}
              fallbackLabel="Portrait not available"
              className="portrait__img"
            />
            <figcaption className="portrait__caption">
              <span className="portrait__name">Clare W. Graves</span>
              <span className="credit">{p.credit}</span>
            </figcaption>
          </figure>
          {hero.intro.map((t) => (
            <p key={t.slice(0, 24)} className="hero__para">
              {t}
            </p>
          ))}
          <p className="model-note">
            <strong>{hero.modelNoteLead}</strong> {hero.modelNote}
          </p>
        </aside>

        <div className="hero__diagram">
          <ValueSystemsDiagram />
        </div>
      </div>
    </section>
  );
}
