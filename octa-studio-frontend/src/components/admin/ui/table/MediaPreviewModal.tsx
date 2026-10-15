'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { useLockBodyScroll } from '@/hooks/ui/useLockBodyScroll';

export type TMediaItem = { type: 'image' | 'video'; src: string };

type TMediaPreviewModalProps = {
    open: boolean;
    onClose: () => void;
    items: TMediaItem[];
    title: string;
};

const NAV =
    'bg-primary-admin/90 text-fourth-admin absolute top-1/2 z-2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow-[0_4px_14px_color-mix(in_srgb,var(--color-fourth-admin)_25%,transparent)] transition-colors duration-150 hover:bg-primary-admin';

/** Galeria a pantalla completa de las fotos o videos de una fila; flechas y Esc del teclado. */
export const MediaPreviewModal = ({ open, onClose, items, title }: TMediaPreviewModalProps) => {
    const [index, setIndex] = useState(0);

    useLockBodyScroll(open);

    const many = items.length > 1;
    const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

    useEffect(() => {
        if (!open) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowLeft') setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
            if (event.key === 'ArrowRight') setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose, items.length]);

    if (!open || items.length === 0) return null;

    const current = items[Math.min(index, items.length - 1)];

    return createPortal(
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-fourth-admin/80 p-5 backdrop-blur-[2px]" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative flex w-full max-w-240 flex-col gap-2.5"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="text-primary-admin flex items-center justify-between gap-2.5">
                    <h3 className="truncate text-sm lg:text-base font-semibold">{title}</h3>

                    <div className="flex shrink-0 items-center gap-2.5">
                        {many && <span className="text-primary-admin/75 text-xs lg:text-sm">{index + 1} / {items.length}</span>}
                        <button type="button" onClick={onClose} aria-label="Cerrar" className="bg-primary-admin/15 hover:bg-primary-admin/25 inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-150">
                            <FaXmark aria-hidden="true" className="size-4 lg:size-4.5" />
                        </button>
                    </div>
                </div>

                <div className="relative flex h-[70vh] items-center justify-center overflow-hidden rounded-xl bg-fourth-admin">
                    {current.type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element -- vista ampliada del backend
                        <img src={current.src} alt={`${title} (${index + 1} de ${items.length})`} className="max-h-full max-w-full object-contain" />
                    ) : (
                        <video key={current.src} src={current.src} controls autoPlay playsInline className="max-h-full max-w-full" />
                    )}

                    {many && (
                        <>
                            <button type="button" onClick={prev} aria-label="Anterior" className={`${NAV} left-3`}>
                                <FaChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                            </button>
                            <button type="button" onClick={next} aria-label="Siguiente" className={`${NAV} right-3`}>
                                <FaChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                            </button>
                        </>
                    )}
                </div>

                {many && current.type === 'image' && (
                    <div className="flex justify-center gap-2.5 overflow-x-auto pb-1.5">
                        {items.map((item, i) => (
                            <button
                                key={item.src}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Ver ${i + 1}`}
                                className={`h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-150 ${i === index ? 'border-primary-admin' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element -- miniatura del backend */}
                                <img src={item.src} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};
