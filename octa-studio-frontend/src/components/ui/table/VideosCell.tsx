'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ARROW =
    'text-gray-600 hover:bg-slate-100 hover:text-ink inline-flex shrink-0 cursor-pointer items-center justify-center rounded p-1.5 transition-colors duration-300';

type TVideosCellProps = { videos: string[]; name: string; baseUrl: string };

export const VideosCell = ({ videos, name, baseUrl }: TVideosCellProps) => {
    const [index, setIndex] = useState(0);

    if (videos.length === 0) {
        return <span className="text-[12px] text-gray-600 italic">Sin videos</span>;
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

            <div className="shrink-0 rounded-[4px] bg-slate-50">
                <video
                    key={videos[index]}
                    src={`${baseUrl}/${videos[index]}`}
                    aria-label={`Video ${index + 1} de ${videos.length} de ${name}`}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-15 w-20 rounded-[4px] object-contain"
                />
            </div>

            {many && (
                <button type="button" onClick={next} aria-label={`Video siguiente de ${name}`} className={ARROW}>
                    <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                </button>
            )}

            {many && (
                <span aria-live="polite" className="shrink-0 text-[12px] text-gray-600">
                    {index + 1}/{videos.length}
                </span>
            )}
        </div>
    );
};
