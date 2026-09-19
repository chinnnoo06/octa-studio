'use client';

import { useEffect, useMemo } from 'react';
import { FiImage, FiX } from 'react-icons/fi';
import { SpanError } from './SpanError';
import { Label } from './Label';

type TImageFieldProps = {
    image: File | null;
    onChange: (image: File | null) => void;
    error?: string;
    id?: string;
    label?: string;
};

/** Una sola imagen, con vista previa. Es `ImagesField` para el caso de un archivo. */
export const ImageField = ({ image, onChange, error, id = 'image', label = 'Imagen destacada' }: TImageFieldProps) => {
    const preview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files?.[0] ?? null);
        event.target.value = '';
    };

    return (
        <div className="form-group">
            <Label htmlFor={id}>{label}</Label>

            <div className="flex flex-col gap-4">
                <label
                    htmlFor={id}
                    className="border-secondary/50 text-fourth/75 hover:border-secondary flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-5 py-8 text-center text-xs transition-colors duration-300 lg:text-sm"
                >
                    <FiImage aria-hidden="true" className="size-6" />
                    {image ? 'Haz clic para cambiar la imagen' : 'Haz clic para elegir una imagen'}
                </label>

                <input id={id} type="file" accept="image/jpeg,image/png,image/webp" onChange={onSelect} className="sr-only" />

                {preview && image && (
                    <div className="relative w-fit">
                        <img
                            src={preview}
                            alt={`Vista previa: ${image.name}`}
                            className="border-secondary/30 h-40 w-auto max-w-full rounded-lg border object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            aria-label={`Quitar ${image.name}`}
                            className="bg-secondary text-primary absolute -top-2 -right-2 inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors duration-300 hover:bg-red-600"
                        >
                            <FiX aria-hidden="true" className="size-3.5" />
                        </button>
                    </div>
                )}
            </div>

            <SpanError message={error} />
        </div>
    );
};
