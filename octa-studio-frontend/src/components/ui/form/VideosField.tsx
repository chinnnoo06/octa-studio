'use client';

import { useEffect, useMemo } from 'react';
import { SpanError } from './SpanError';
import { Label } from './Label';
import { MEDIA_GRID, MediaTile } from './MediaTile';

type TVideosFieldProps = {
    videos: File[];
    onChange: (videos: File[]) => void;
    error?: string;
    max?: number;
};

/** Varios videos en cuadros. Es `ImagesField` para archivos de video. */
export const VideosField = ({ videos, onChange, error, max = 5 }: TVideosFieldProps) => {
    const previews = useMemo(() => videos.map((video) => URL.createObjectURL(video)), [videos]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const onAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);

        onChange([...videos, ...picked].slice(0, max));
        event.target.value = '';
    };

    const removeAt = (index: number) => onChange(videos.filter((_, i) => i !== index));

    const full = videos.length >= max;

    return (
        <div className="form-group">
            <Label htmlFor="videos">Videos del proyecto, opcional ({videos.length} de {max}) · MP4 o WebM, 50 MB máximo</Label>

            <ul role="list" className={`${MEDIA_GRID} mt-1`}>
                {previews.map((preview, i) => (
                    <li key={preview}>
                        <MediaTile onRemove={() => removeAt(i)} removeLabel={`Quitar ${videos[i].name}`}>
                            <video
                                src={preview}
                                controls
                                muted
                                playsInline
                                preload="metadata"
                                aria-label={`Vista previa ${i + 1}: ${videos[i].name}`}
                                className="h-full w-full bg-slate-800 object-cover"
                            />
                        </MediaTile>
                    </li>
                ))}

                {!full && (
                    <li>
                        <MediaTile htmlFor="videos" />
                    </li>
                )}
            </ul>

            <input
                id="videos"
                type="file"
                accept="video/mp4,video/webm"
                multiple
                disabled={full}
                onChange={onAdd}
                className="sr-only"
            />

            <SpanError message={error} />
        </div>
    );
};
