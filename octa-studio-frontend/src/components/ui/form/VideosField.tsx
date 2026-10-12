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
    /** Al editar: nombres de los videos guardados que se conservan. */
    existing?: string[];
    onExistingChange?: (names: string[]) => void;
    existingBaseUrl?: string;
};

const VIDEO = 'h-full w-full bg-slate-800 object-cover';

/** Varios videos en cuadros: primero los guardados, luego los nuevos. */
export const VideosField = ({ videos, onChange, error, max = 5, existing = [], onExistingChange, existingBaseUrl = '' }: TVideosFieldProps) => {
    const previews = useMemo(() => videos.map((video) => URL.createObjectURL(video)), [videos]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const total = existing.length + videos.length;
    const full = total >= max;

    const onAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);

        onChange([...videos, ...picked].slice(0, max - existing.length));
        event.target.value = '';
    };

    return (
        <div className="form-group">
            <Label htmlFor="videos">Videos del proyecto, opcional ({total} de {max}) · MP4 o WebM, 50 MB máximo</Label>

            <ul role="list" className={`${MEDIA_GRID} mt-1`}>
                {existing.map((name, i) => (
                    <li key={name}>
                        <MediaTile
                            onRemove={onExistingChange ? () => onExistingChange(existing.filter((n) => n !== name)) : undefined}
                            removeLabel={`Quitar el video ${i + 1}`}
                        >
                            <video src={`${existingBaseUrl}/${name}`} controls muted playsInline preload="metadata" aria-label={`Video actual ${i + 1}`} className={VIDEO} />
                        </MediaTile>
                    </li>
                ))}

                {previews.map((preview, i) => (
                    <li key={preview}>
                        <MediaTile onRemove={() => onChange(videos.filter((_, j) => j !== i))} removeLabel={`Quitar ${videos[i].name}`}>
                            <video src={preview} controls muted playsInline preload="metadata" aria-label={`Vista previa: ${videos[i].name}`} className={VIDEO} />
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
