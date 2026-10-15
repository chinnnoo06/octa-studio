import Image from 'next/image';

type TImageCellProps = {
    image: string;
    name: string;
    baseUrl: string;
    /** `cover` llena el cuadro (fotos); `contain` muestra la imagen completa (logos). */
    fit?: 'cover' | 'contain';
};

/** Miniatura de tamaño fijo (72x54): todas las filas quedan alineadas. */
const THUMB = 'relative block h-13.5 w-18 shrink-0 overflow-hidden rounded-xl border border-fourth-admin/30';

export const ImageCell = ({ image, name, baseUrl, fit = 'cover' }: TImageCellProps) => (
    <span className={`${THUMB} mx-auto ${fit === 'contain' ? 'bg-primary-admin p-1.5' : 'bg-thrird-admin'}`}>
        <Image
            src={`${baseUrl}/${image}`}
            alt={`Imagen de ${name}`}
            width={144}
            height={108}
            className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
    </span>
);
