'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa6';
import { THUMB } from './ImageCell';
import { MediaPreviewModal } from './MediaPreviewModal';

type TImagesCellProps = { images: string[]; name: string; baseUrl: string };

/**
 * Portada de la galeria: la primera imagen a tamaño fijo, con efecto de pila y
 * contador cuando hay mas. Al pulsarla se abre la galeria completa.
 */
export const ImagesCell = ({ images, name, baseUrl }: TImagesCellProps) => {
    const [open, setOpen] = useState(false);

    if (images.length === 0) {
        return (
            <span className={`${THUMB} mx-auto flex items-center justify-center bg-slate-50 text-slate-300`} title="Sin imágenes">
                <FaImage aria-hidden="true" className="size-5" />
            </span>
        );
    }

    const extra = images.length - 1;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Ver las ${images.length} imágenes de ${name}`}
                title="Ver galería"
                className="group relative mx-auto block cursor-zoom-in"
            >
                {/* Capas traseras: sugieren que hay mas fotos detras de la portada. */}
                {extra > 0 && (
                    <>
                        <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 -translate-y-1.5 rounded-[6px] border border-slate-200 bg-slate-100" />
                        <span aria-hidden="true" className="absolute inset-0 translate-x-0.75 -translate-y-0.75 rounded-[6px] border border-slate-200 bg-slate-50" />
                    </>
                )}

                <span className={`${THUMB} bg-slate-100 transition-shadow duration-150 group-hover:shadow-[0_4px_12px_rgba(24,96,140,0.25)]`}>
                    <Image
                        src={`${baseUrl}/${images[0]}`}
                        alt={`Portada de ${name}`}
                        width={144}
                        height={108}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />

                    {extra > 0 && (
                        <span className="text-primary absolute right-1 bottom-1 rounded-full bg-black/70 px-1.5 py-0.25 text-[10.5px] leading-tight font-semibold">
                            +{extra}
                        </span>
                    )}
                </span>
            </button>

            <MediaPreviewModal
                open={open}
                onClose={() => setOpen(false)}
                title={`Imágenes de ${name}`}
                items={images.map((image) => ({ type: 'image', src: `${baseUrl}/${image}` }))}
            />
        </>
    );
};
