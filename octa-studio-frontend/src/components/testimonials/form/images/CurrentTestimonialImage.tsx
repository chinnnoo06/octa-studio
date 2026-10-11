import Image from 'next/image';
import { MediaTile } from '@/components/ui/form/MediaTile';

export const CurrentTestimonialImage = ({ image, name }: { image: string; name: string }) => {
    return (
        <MediaTile className="max-w-70">
            <Image
                src={`${process.env.NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL}/${image}`}
                alt={`Imagen actual de la empresa de ${name}`}
                width={280}
                height={280}
                className="h-full w-full object-contain"
            />
        </MediaTile>
    );
};
