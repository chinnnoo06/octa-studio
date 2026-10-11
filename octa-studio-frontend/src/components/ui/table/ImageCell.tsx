import Image from 'next/image';

type TImageCellProps = { image: string; name: string; baseUrl: string };

export const ImageCell = ({ image, name, baseUrl }: TImageCellProps) => (
    <div className="border-secondary/30 bg-primary w-fit shrink-0 rounded border p-0.5">
        <Image
            src={`${baseUrl}/${image}`}
            alt={`Imagen de ${name}`}
            width={56}
            height={40}
            className="h-10 w-14 object-contain"
        />
    </div>
);
