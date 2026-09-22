'use client';

import { useEffect, useMemo } from 'react';
import { FiVideo, FiX } from 'react-icons/fi';
import { SpanError } from './SpanError';
import { Label } from './Label';

type TVideosFieldProps = {
    videos: File[];
    onChange: (videos: File[]) => void;
    error?: string;
    max?: number;
};

/** Varios videos con vista previa. Es `ImagesField` para archivos de video. */
export const VideosField = ({ videos, onChange, error, max = 5 }: TVideosFieldProps) => {
    const previews = useMemo(() => videos.map((video) => URL.createObjectURL(video)), [videos]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);

        onChange([...videos, ...picked].slice(0, max));
        event.target.value = '';
    };

    const removeAt = (index: number) => onChange(videos.filter((_, i) => i !== index));

    const full = videos.length >= max;

    return (
        <div className="form-group">
            <Label htmlFor="videos">Videos del proyecto (opcional)</Label>

            <div className="flex flex-col gap-4">
                <label
                    htmlFor="videos"
                    aria-disabled={full}
                    className={`border-secondary/50 text-fourth/75 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-5 py-8 text-center text-xs transition-colors duration-300 lg:text-sm ${full
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:border-secondary cursor-pointer'
                        }`}
                >
                    <FiVideo aria-hidden="true" className="size-6" />
                    {full
                        ? `Máximo ${max} videos`
                        : `Haz clic para elegir videos (${videos.length} de ${max}) · MP4 o WebM, 50 MB máximo`}
                </label>

                <input
                    id="videos"
                    type="file"
                    accept="video/mp4,video/webm"
                    multiple
                    disabled={full}
                    onChange={onSelect}
                    className="sr-only"
                />

                {previews.length > 0 && (
                    <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {previews.map((preview, i) => (
                            <li key={preview} className="group relative">
                                <video
                                    src={preview}
                                    controls
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-label={`Vista previa ${i + 1}: ${videos[i].name}`}
                                    className="border-secondary/30 aspect-video w-full rounded-lg border bg-black object-contain"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeAt(i)}
                                    aria-label={`Quitar ${videos[i].name}`}
                                    className="bg-secondary text-primary absolute -top-2 -right-2 inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors duration-300 hover:bg-red-600"
                                >
                                    <FiX aria-hidden="true" className="size-3.5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <SpanError message={error} />
        </div>
    );
};
