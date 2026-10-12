import Image from 'next/image';

type TImageCellProps = {
    image: string;
    name: string;
    baseUrl: string;
    /** `cover` llena el cuadro (fotos); `contain` muestra la imagen completa (logos). */
    fit?: 'cover' | 'contain';
};

/** Miniatura de tamaño fijo (72x54): todas las filas quedan alineadas. */
export const THUMB = 'relative block h-13.5 w-18 shrink-0 overflow-hidden rounded-[6px] border border-slate-200';

export const ImageCell = ({ image, name, baseUrl, fit = 'cover' }: TImageCellProps) => (
    <span className={`${THUMB} mx-auto ${fit === 'contain' ? 'bg-primary p-1' : 'bg-slate-100'}`}>
        <Image
            src={`${baseUrl}/${image}`}
            alt={`Imagen de ${name}`}
            width={144}
            height={108}
            className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
    </span>
);
