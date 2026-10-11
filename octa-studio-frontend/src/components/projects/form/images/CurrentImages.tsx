import Image from 'next/image';
import { MEDIA_GRID, MediaTile } from '@/components/ui/form/MediaTile';

export const CurrentImages = ({ images, name }: { images: string[]; name: string }) => {
    if (images.length === 0) {
        return <p className="text-[13px] text-gray-600 italic">Este proyecto no tiene imágenes.</p>;
    }

    return (
        <ul role="list" className={MEDIA_GRID}>
            {images.map((image, i) => (
                <li key={image}>
                    <MediaTile principal={i === 0}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL}/${image}`}
                            alt={`Imagen actual ${i + 1} de ${name}`}
                            width={200}
                            height={200}
                            className="h-full w-full object-contain"
                        />
                    </MediaTile>
                </li>
            ))}
        </ul>
    );
};
