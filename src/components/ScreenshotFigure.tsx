import { useCallback, useState } from 'react';
import type { Level, SlideLine } from '../content/types';
import { screenshotCredit } from '../content/levels';
import { SafeImage } from './SafeImage';
import { ImageDialog } from './ImageDialog';

function SlideText({ level, idPrefix }: { level: Level; idPrefix: string }) {
  const s = level.screenshot;
  const rows = (items: SlideLine[]) =>
    items.map((l, i) => (
      <tr key={`${l.ru}-${i}`}>
        <td lang="ru" className="slide-text__ru">
          {l.ru}
        </td>
        <td className="slide-text__en">
          {l.en}
          {l.note && <span className="slide-text__note">{l.note}</span>}
        </td>
      </tr>
    ));
  return (
    <div className="slide-text">
      <table aria-labelledby={`${idPrefix}-st`}>
        <caption id={`${idPrefix}-st`} className="slide-text__caption">
          Slide text, translated
        </caption>
        <thead>
          <tr>
            <th scope="col">Russian (on slide)</th>
            <th scope="col">English meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr className="slide-text__heading">
            <td lang="ru" className="slide-text__ru">
              {s.headingRu}
            </td>
            <td className="slide-text__en">
              {s.headingEn}
              <span className="slide-text__note">Slide heading</span>
            </td>
          </tr>
          {rows(s.lines)}
          {s.chartLabels && (
            <>
              <tr className="slide-text__group">
                <th colSpan={2} scope="rowgroup">
                  Labels in the chart
                </th>
              </tr>
              {rows(s.chartLabels)}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function ScreenshotFigure({ level }: { level: Level }) {
  const s = level.screenshot;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const alt = `Slide titled “${s.headingRu}” (${s.headingEn}). ${s.diagram}`;

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
      <SlideText level={level} idPrefix={`panel-${level.id}`} />
      <figcaption id={`shot-cap-${level.id}`} className="shot__caption">
        <p>
          <strong>The diagram:</strong> {s.diagram}
        </p>
        {s.limitations && (
          <p className="shot__limit">
            <strong>Not transcribed:</strong> {s.limitations}
          </p>
        )}
        <p className="credit">{screenshotCredit}</p>
        <button type="button" className="btn btn--quiet" onClick={() => setOpen(true)}>
          Enlarge image
        </button>
      </figcaption>

      <ImageDialog
        open={open}
        onClose={close}
        title={`${level.colorLabel}: “${s.headingRu}” (${s.headingEn})`}
        path={s.src}
        width={s.width}
        height={s.height}
        alt={alt}
        filename={s.originalFilename}
      >
        <SlideText level={level} idPrefix={`dialog-${level.id}`} />
        {s.limitations && (
          <p className="shot__limit">
            <strong>Not transcribed:</strong> {s.limitations}
          </p>
        )}
        <p className="credit">{screenshotCredit}</p>
      </ImageDialog>
    </figure>
  );
}
