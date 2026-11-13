import { assets, theory } from '../content/site';
import { SafeImage } from './SafeImage';
import { ImageDialog } from './ImageDialog';
import { useCallback, useState } from 'react';

export function Theory() {
  const f = assets.gravesFigure;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <section id="theory" className="section theory" aria-labelledby="theory-title">
      <div className="wrap">
        <header className="section__head">
          <p className="section__num">01</p>
          <h2 id="theory-title" className="section__title">
            {theory.title}
          </h2>
          <p className="section__intro">{theory.intro}</p>
        </header>

        <div className="theory__grid">
          <ol className="ideas">
            {theory.ideas.map((idea) => (
              <li key={idea.title} className="idea">
                <h3 className="idea__title">{idea.title}</h3>
                <p>{idea.text}</p>
              </li>
            ))}
          </ol>

          <figure className="figure figure--graves">
            <SafeImage path={f.src} width={f.width} height={f.height} alt={f.alt} filename={f.originalFilename} className="figure__img" loading="lazy" />
            <figcaption className="figure__caption">
              <p>{f.caption}</p>
              <button type="button" className="btn btn--quiet" onClick={() => setOpen(true)}>
                Enlarge figure
              </button>
            </figcaption>
            <div className="letters">
              <h3 className="letters__title">{theory.lettersTitle}</h3>
              <p>{theory.letters}</p>
            </div>
          </figure>
        </div>

        <div className="layers" role="list" aria-label={theory.layersTitle}>
          <h3 className="layers__title">{theory.layersTitle}</h3>
          {theory.layers.map((l) => (
            <div key={l.numeral} className="layer" role="listitem">
              <span className="layer__num" aria-hidden="true">
                {l.numeral}
              </span>
              <h4 className="layer__title">{l.title}</h4>
              <p>{l.text}</p>
            </div>
          ))}
        </div>
      </div>
      <ImageDialog open={open} onClose={close} title="Graves (1970), Figure 1" path={f.src} width={f.width} height={f.height} alt={f.alt} filename={f.originalFilename}>
        <p>{f.caption}</p>
      </ImageDialog>
    </section>
  );
}
