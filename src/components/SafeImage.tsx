import { useState, type ImgHTMLAttributes } from 'react';
import { assetUrl } from '../lib/assetUrl';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  /** Content path, resolved with `assetUrl`. */
  path: string;
  width: number;
  height: number;
  alt: string;
  /** Shown in the fallback so a missing file is easy to trace. */
  filename?: string;
  /** Text shown when the image cannot be loaded. */
  fallbackLabel?: string;
}

/**
 * An <img> that keeps its aspect ratio and degrades to a labelled placeholder
 * if the file is missing or unreadable. It never substitutes another image.
 */
export function SafeImage({ path, width, height, alt, filename, fallbackLabel, className, ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const [prevPath, setPrevPath] = useState(path);
  if (path !== prevPath) {
    setPrevPath(path);
    setFailed(false);
  }

  if (failed) {
    return (
      <div
        className={`img-fallback ${className ?? ''}`}
        style={{ aspectRatio: `${width} / ${height}` }}
        role="img"
        aria-label={`${fallbackLabel ?? 'Image unavailable'}: ${alt}`}
      >
        <span className="img-fallback__title">{fallbackLabel ?? 'Image unavailable'}</span>
        {filename && <span className="img-fallback__file">{filename}</span>}
      </div>
    );
  }

  return (
    <img
      {...rest}
      className={className}
      src={assetUrl(path)}
      width={width}
      height={height}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ aspectRatio: `${width} / ${height}`, ...rest.style }}
    />
  );
}
