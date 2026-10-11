'use client';

import { useEffect, useMemo } from 'react';
import { SpanError } from './SpanError';
import { Label } from './Label';
import { MEDIA_GRID, MediaTile } from './MediaTile';

type TImagesFieldProps = {
    images: File[];
    onChange: (images: File[]) => void;
    error?: string;
    max?: number;
};

/** Galeria: un cuadro por imagen (la primera es la principal) y el "+ Añadir" al final. */
export const ImagesField = ({ images, onChange, error, max = 5 }: TImagesFieldProps) => {
    const previews = useMemo(() => images.map((image) => URL.createObjectURL(image)), [images]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const onAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);

        onChange([...images, ...picked].slice(0, max));
        event.target.value = '';
    };

    // Pulsar un cuadro con imagen la reemplaza en su misma posicion.
    const onReplace = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) onChange(images.map((image, i) => (i === index ? file : image)));
        event.target.value = '';
    };

    const removeAt = (index: number) => onChange(images.filter((_, i) => i !== index));

    const full = images.length >= max;

    return (
        <div className="form-group">
            <Label htmlFor="images">Imágenes del proyecto ({images.length} de {max}) · JPG, PNG o WebP</Label>

            <ul role="list" className={`${MEDIA_GRID} mt-1`}>
                {previews.map((preview, i) => (
                    <li key={preview}>
                        <MediaTile
                            htmlFor={`images-replace-${i}`}
                            hoverText="Cambiar imagen"
                            principal={i === 0}
                            onRemove={() => removeAt(i)}
                            removeLabel={`Quitar ${images[i].name}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element -- vista previa local (blob) */}
                            <img src={preview} alt={`Vista previa ${i + 1}: ${images[i].name}`} className="h-full w-full object-contain" />
                        </MediaTile>

                        <input id={`images-replace-${i}`} type="file" accept="image/jpeg,image/png,image/webp" onChange={onReplace(i)} className="sr-only" />
                    </li>
                ))}

                {!full && (
                    <li>
                        <MediaTile htmlFor="images" />
                    </li>
                )}
            </ul>

            <input
                id="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={full}
                onChange={onAdd}
                className="sr-only"
            />

            <SpanError message={error} />
        </div>
    );
};
