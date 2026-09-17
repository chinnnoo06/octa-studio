'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ARROW =
    'text-fourth/75 hover:bg-secondary/15 hover:text-secondary inline-flex shrink-0 cursor-pointer items-center justify-center rounded p-1 transition-colors duration-300';

export const BlogImages = ({ images, name }: { images: string[]; name: string }) => {
    const [index, setIndex] = useState(0);

    if (images.length === 0) {
        return <span className="text-fourth/50 text-xs">Sin imágenes</span>;
    }

    const many = images.length > 1;

    const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    console.log(`${process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL}/${images[index]}`)
    return (
        <div className="flex items-center gap-1">
            {many && (
                <button type="button" onClick={prev} aria-label={`Imagen anterior de ${name}`} className={ARROW}>
                    <FiChevronLeft aria-hidden="true" className="size-4" />
                </button>
            )}

            <div className="border-secondary/30 bg-primary shrink-0 rounded border p-0.5">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL}/${images[index]}`}
                    alt={`Imagen ${index + 1} de ${images.length} de ${name}`}
                    width={56}
                    height={40}
                    className="h-10 w-14 object-contain"
                />
            </div>

            {many && (
                <button type="button" onClick={next} aria-label={`Imagen siguiente de ${name}`} className={ARROW}>
                    <FiChevronRight aria-hidden="true" className="size-4" />
                </button>
            )}

            {many && (
                <span aria-live="polite" className="text-fourth/75 shrink-0 text-xs">
                    {index + 1}/{images.length}
                </span>
            )}
        </div>
    );
};
