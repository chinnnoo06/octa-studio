'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ARROW =
    'text-fourth/75 hover:bg-secondary/15 hover:text-secondary inline-flex shrink-0 cursor-pointer items-center justify-center rounded p-1.5 transition-colors duration-300';

type TVideosCellProps = { videos: string[]; name: string; baseUrl: string };

export const VideosCell = ({ videos, name, baseUrl }: TVideosCellProps) => {
    const [index, setIndex] = useState(0);

    if (videos.length === 0) {
        return <span className="text-fourth/75 text-xs lg:text-sm">Sin videos</span>;
    }

    const many = videos.length > 1;

    const prev = () => setIndex((i) => (i === 0 ? videos.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === videos.length - 1 ? 0 : i + 1));

    return (
        <div className="flex min-w-45 items-center gap-2.5">
            {many && (
                <button type="button" onClick={prev} aria-label={`Video anterior de ${name}`} className={ARROW}>
                    <FiChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                </button>
            )}

            <div className="border-secondary/30 bg-primary shrink-0 rounded border p-0.5">
                <video
                    key={videos[index]}
                    src={`${baseUrl}/${videos[index]}`}
                    aria-label={`Video ${index + 1} de ${videos.length} de ${name}`}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-10 w-14 object-contain"
                />
            </div>

            {many && (
                <button type="button" onClick={next} aria-label={`Video siguiente de ${name}`} className={ARROW}>
                    <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                </button>
            )}

            {many && (
                <span aria-live="polite" className="text-fourth/75 shrink-0 text-xs lg:text-sm">
                    {index + 1}/{videos.length}
                </span>
            )}
        </div>
    );
};
