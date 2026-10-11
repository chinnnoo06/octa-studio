import { ReactNode } from 'react';
import { FaPlus, FaXmark } from 'react-icons/fa6';

/** Rejilla de cuadros de imagen/video: 2, 3, 4 y 5 columnas segun el ancho. */
export const MEDIA_GRID = 'grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 md:grid-cols-4 md:gap-3 xl:grid-cols-5';

type TMediaTileProps = {
  /** Imagen o video ya elegido; sin el, el cuadro es el "+ Añadir" punteado. */
  children?: ReactNode;
  /** Id del input file que abre el cuadro al pulsarlo. */
  htmlFor?: string;
  /** Texto que aparece abajo al pasar el raton sobre un cuadro con contenido. */
  hoverText?: string;
  /** Etiqueta "Principal" en la esquina (primera imagen de una galeria). */
  principal?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
  className?: string;
};

/** Cuadro de medios del panel: vacio punteado con "+", o el archivo con borde solido. */
export const MediaTile = ({ children, htmlFor, hoverText, principal, onRemove, removeLabel, disabled, className }: TMediaTileProps) => {
  const filled = Boolean(children);

  const box = `group/tile relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[9px] border-2 transition-[border-color,background-color] duration-200 ${filled
    ? 'bg-primary border-solid border-slate-200'
    : 'border-dashed border-slate-300 bg-slate-50'
    } ${disabled ? 'cursor-not-allowed opacity-50' : htmlFor ? 'hover:border-secondary cursor-pointer' : ''} ${!filled && !disabled ? 'hover:bg-secondary/6' : ''}`;

  const content = (
    <>
      {filled ? (
        children
      ) : (
        <span className="pointer-events-none flex flex-col items-center gap-1 text-slate-400 transition-all duration-200 select-none group-hover/tile:scale-110 group-hover/tile:text-secondary">
          <FaPlus aria-hidden="true" className="size-6" />
          <span className="text-[10.5px] font-semibold tracking-[0.3px] uppercase">Añadir</span>
        </span>
      )}

      {principal && filled && (
        <span className="bg-secondary text-primary pointer-events-none absolute top-1.25 left-1.25 z-2 rounded-[4px] px-1.75 py-0.5 text-[10px] leading-[1.2] font-semibold tracking-[0.3px] uppercase shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
          Principal
        </span>
      )}

      {hoverText && filled && (
        <span className="text-primary pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent)] px-1.5 pt-3.75 pb-1.75 text-center text-[11.5px] font-semibold opacity-0 transition-opacity duration-150 group-hover/tile:opacity-100">
          {hoverText}
        </span>
      )}
    </>
  );

  return (
    <div className={`group/media relative ${className ?? ''}`}>
      {htmlFor && !disabled ? (
        <label htmlFor={htmlFor} className={box}>{content}</label>
      ) : (
        <div className={box}>{content}</div>
      )}

      {onRemove && filled && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="bg-primary text-ink absolute top-1.25 right-1.25 z-3 inline-flex size-6 -translate-y-0.5 cursor-pointer items-center justify-center rounded-full border border-slate-200 opacity-0 shadow-[0_2px_6px_rgba(15,23,42,0.12)] transition-all duration-150 group-hover/media:translate-y-0 group-hover/media:opacity-100 hover:border-red-700 hover:bg-red-700 hover:text-primary focus-visible:translate-y-0 focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
        >
          <FaXmark aria-hidden="true" className="size-2.75" />
        </button>
      )}
    </div>
  );
};
