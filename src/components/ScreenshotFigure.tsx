import { useCallback, useState } from 'react';
import type { Level } from '../content/types';
import { screenshotCredit } from '../content/levels';
import { SafeImage } from './SafeImage';
import { ImageDialog } from './ImageDialog';

export function ScreenshotFigure({ level }: { level: Level }) {
  const s = level.screenshot;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  // The slide text is only in the image, so the alt text carries all of it.
  const alt = `Slide titled “${s.heading}”. ${s.diagram} Labels: ${s.labels.join('; ')}.`;

  return (
    <figure className="shot" aria-labelledby={`shot-cap-${level.id}`}>
      <div className="shot__media">
        <button type="button" className="shot__zoom" onClick={() => setOpen(true)} aria-label={`Enlarge the ${level.colorLabel} slide`}>
          <SafeImage
            path={s.src}
            width={s.width}
            height={s.height}
            alt={alt}
            filename={s.originalFilename}
            fallbackLabel="Screenshot not available"
            className="shot__img"
          />
          <span className="shot__zoom-hint" aria-hidden="true">
            Enlarge ⤢
          </span>
        </button>
      </div>
      <figcaption id={`shot-cap-${level.id}`} className="shot__caption">
        <p>
          <strong>The diagram:</strong> {s.diagram}
        </p>
        <p className="credit">{screenshotCredit}</p>
        <button type="button" className="btn btn--quiet" onClick={() => setOpen(true)}>
          Enlarge image
        </button>
      </figcaption>

      <ImageDialog
        open={open}
        onClose={close}
        title={`${level.colorLabel}: “${s.heading}”`}
        path={s.src}
        width={s.width}
        height={s.height}
        alt={alt}
        filename={s.originalFilename}
        stacked
      >
        <p className="credit">{screenshotCredit}</p>
      </ImageDialog>
    </figure>
  );
}
