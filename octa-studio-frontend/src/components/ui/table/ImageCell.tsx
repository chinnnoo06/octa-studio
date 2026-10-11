import Image from 'next/image';

type TImageCellProps = { image: string; name: string; baseUrl: string };

/** Miniatura de las tablas y tarjetas del panel (80x60, sin recortar). */
export const ImageCell = ({ image, name, baseUrl }: TImageCellProps) => (
    <Image
        src={`${baseUrl}/${image}`}
        alt={`Imagen de ${name}`}
        width={80}
        height={60}
        className="mx-auto h-15 w-full max-w-20 rounded-[4px] object-contain mix-blend-multiply"
    />
);
