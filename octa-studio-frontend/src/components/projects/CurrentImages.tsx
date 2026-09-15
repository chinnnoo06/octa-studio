import Image from 'next/image';

export const CurrentImages = ({ images, name }: { images: string[]; name: string }) => {
    if (images.length === 0) {
        return <p className="text-fourth/75 text-xs lg:text-sm">Este proyecto no tiene imágenes.</p>;
    }

    return (
        <ul role="list" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {images.map((image) => (
                <li key={image}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL}/${image}`}
                        alt={`Imagen actual de ${name}`}
                        width={200}
                        height={200}
                        className="border-secondary/30 aspect-square w-full rounded-lg border object-cover"
                    />
                </li>
            ))}
        </ul>
    );
};
