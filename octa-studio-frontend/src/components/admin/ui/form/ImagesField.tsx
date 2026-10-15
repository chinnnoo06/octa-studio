'use client';

import { useEffect, useMemo } from 'react';
import { SpanError } from './SpanError';
import { Label } from './Label';
import { MediaTile } from './MediaTile';

type TImagesFieldProps = {
    images: File[];
    onChange: (images: File[]) => void;
    error?: string;
    max?: number;
    existing?: string[];
    onExistingChange?: (names: string[]) => void;
    existingBaseUrl?: string;
};


export const ImagesField = ({ images, onChange, error, max = 5, existing = [], onExistingChange, existingBaseUrl = '' }: TImagesFieldProps) => {
    const previews = useMemo(() => images.map((image) => URL.createObjectURL(image)), [images]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const total = existing.length + images.length;
    const full = total >= max;

    const onAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);

        onChange([...images, ...picked].slice(0, max - existing.length));
        event.target.value = '';
    };

    const onReplace = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) onChange(images.map((image, i) => (i === index ? file : image)));
        event.target.value = '';
    };

    return (
        <div className="form-group">
            <Label htmlFor="images">Imágenes del proyecto ({total} de {max}) · JPG, PNG o WebP</Label>

            <ul role="list" className="grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mt-1.5">
                {existing.map((name, i) => (
                    <li key={name}>
                        <MediaTile
                            principal={i === 0}
                            onRemove={onExistingChange ? () => onExistingChange(existing.filter((n) => n !== name)) : undefined}
                            removeLabel={`Quitar la imagen ${i + 1}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element -- imagen guardada en el backend */}
                            <img src={`${existingBaseUrl}/${name}`} alt={`Imagen actual ${i + 1}`} className="h-full w-full object-contain" />
                        </MediaTile>
                    </li>
                ))}

                {previews.map((preview, i) => (
                    <li key={preview}>
                        <MediaTile
                            htmlFor={`images-replace-${i}`}
                            hoverText="Cambiar imagen"
                            principal={existing.length === 0 && i === 0}
                            onRemove={() => onChange(images.filter((_, j) => j !== i))}
                            removeLabel={`Quitar ${images[i].name}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element -- vista previa local (blob) */}
                            <img src={preview} alt={`Vista previa: ${images[i].name}`} className="h-full w-full object-contain" />
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
