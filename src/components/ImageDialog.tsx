import { useEffect, useRef, type ReactNode } from 'react';
import { SafeImage } from './SafeImage';

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  path: string;
  width: number;
  height: number;
  alt: string;
  filename?: string;
  /** Put the children under the image instead of in a side column. */
  stacked?: boolean;
  children?: ReactNode;
}

/**
 * Enlarged image view built on the native <dialog> element.
 * - showModal() makes the rest of the page inert and traps focus.
 * - Escape closes it (the browser fires `cancel`, which we route to onClose).
 * - Focus returns to the element that opened it.
 * - Clicking the dimmed backdrop also closes it.
 */
export function ImageDialog({ open, onClose, title, path, width, height, alt, filename, stacked = false, children }: ImageDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      dlg.showModal();
      closeBtn.current?.focus();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onDialogClose = () => {
      returnFocus.current?.focus();
      onClose();
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dlg.addEventListener('close', onDialogClose);
    dlg.addEventListener('cancel', onCancel);
    return () => {
      dlg.removeEventListener('close', onDialogClose);
      dlg.removeEventListener('cancel', onCancel);
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className="image-dialog"
      aria-labelledby="image-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="image-dialog__inner">
        <header className="image-dialog__header">
          <h2 id="image-dialog-title" className="image-dialog__title">
            {title}
          </h2>
          <button ref={closeBtn} type="button" className="btn btn--quiet" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
            <span className="visually-hidden"> enlarged image (Escape)</span>
          </button>
        </header>
        <div className={`image-dialog__body ${stacked ? 'image-dialog__body--stacked' : ''}`}>
          {open && (
            <SafeImage path={path} width={width} height={height} alt={alt} filename={filename} className="image-dialog__img" />
          )}
          {children && <div className="image-dialog__aside">{children}</div>}
        </div>
      </div>
    </dialog>
  );
}
