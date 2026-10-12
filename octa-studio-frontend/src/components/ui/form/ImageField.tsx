'use client';

import { useEffect, useMemo } from 'react';
import { SpanError } from './SpanError';
import { Label } from './Label';
import { MediaTile } from './MediaTile';

type TImageFieldProps = {
    image: File | null;
    onChange: (image: File | null) => void;
    error?: string;
    id?: string;
    label?: string;
    hint?: string;
    /** Al editar: la imagen guardada, que se ve mientras no se elija otra. */
    currentUrl?: string;
};

/** Una sola imagen: un cuadro que se pulsa para elegirla o cambiarla. */
export const ImageField = ({ image, onChange, error, id = 'image', label = 'Imagen destacada', hint, currentUrl }: TImageFieldProps) => {
    const preview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Cancelar el selector no borra la imagen ya elegida.
        const file = event.target.files?.[0];
        if (file) onChange(file);
        event.target.value = '';
    };

    const src = preview ?? currentUrl;

    return (
        <div className="form-group">
            <Label htmlFor={id}>{label}</Label>

            <MediaTile
                htmlFor={id}
                hoverText="Cambiar Imagen"
                // La X solo descarta la imagen nueva; la guardada se reemplaza eligiendo otra.
                onRemove={image ? () => onChange(null) : undefined}
                removeLabel={image ? `Quitar ${image.name}` : undefined}
                className="mt-1 max-w-70"
            >
                {src && (
                    // eslint-disable-next-line @next/next/no-img-element -- vista previa local (blob) o imagen guardada
                    <img src={src} alt={image ? `Vista previa: ${image.name}` : 'Imagen actual'} className="h-full w-full object-contain" />
                )}
            </MediaTile>

            <input id={id} type="file" accept="image/jpeg,image/png,image/webp" onChange={onSelect} className="sr-only" />

            {currentUrl && image && <p className="mt-2 text-[12px] text-gray-600">Al guardar, la imagen actual se reemplaza por esta.</p>}

            {hint && <p className="mt-2.5 text-[13px] leading-[1.55] text-gray-600">{hint}</p>}

            <SpanError message={error} />
        </div>
    );
};
