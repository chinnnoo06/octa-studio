'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ARROW =
    'text-gray-600 hover:bg-slate-100 hover:text-ink inline-flex shrink-0 cursor-pointer items-center justify-center rounded p-1.5 transition-colors duration-300';

type TImagesCellProps = { images: string[]; name: string; baseUrl: string };

export const ImagesCell = ({ images, name, baseUrl }: TImagesCellProps) => {
    const [index, setIndex] = useState(0);

    if (images.length === 0) {
        return <span className="text-[12px] text-gray-600 italic">Sin imágenes</span>;
    }

    const many = images.length > 1;

    const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    return (
        <div className="flex min-w-45 items-center gap-2.5">
            {many && (
                <button type="button" onClick={prev} aria-label={`Imagen anterior de ${name}`} className={ARROW}>
                    <FiChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                </button>
            )}

            <div className="shrink-0 rounded-[4px] bg-slate-50">
                <Image
                    src={`${baseUrl}/${images[index]}`}
                    alt={`Imagen ${index + 1} de ${images.length} de ${name}`}
                    width={80}
                    height={60}
                    className="h-15 w-20 rounded-[4px] object-contain"
                />
            </div>

            {many && (
                <button type="button" onClick={next} aria-label={`Imagen siguiente de ${name}`} className={ARROW}>
                    <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                </button>
            )}

            {many && (
                <span aria-live="polite" className="shrink-0 text-[12px] text-gray-600">
                    {index + 1}/{images.length}
                </span>
            )}
        </div>
    );
};
