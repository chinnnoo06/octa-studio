import Image from 'next/image';

export const CurrentTestimonialImage = ({ image, name }: { image: string; name: string }) => {
    return (
        <Image
            src={`${process.env.NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL}/${image}`}
            alt={`Imagen actual de la empresa de ${name}`}
            width={400}
            height={300}
            className="border-secondary/30 h-60 w-auto max-w-full rounded-lg border object-contain"
        />
    );
};
