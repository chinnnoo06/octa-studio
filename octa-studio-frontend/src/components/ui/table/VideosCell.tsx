'use client';

import { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { MediaPreviewModal } from './MediaPreviewModal';

type TVideosCellProps = { videos: string[]; name: string; baseUrl: string };

/** Pildora "▶ 2 videos" que abre los videos en la galeria; sin videos queda en gris. */
export const VideosCell = ({ videos, name, baseUrl }: TVideosCellProps) => {
    const [open, setOpen] = useState(false);

    if (videos.length === 0) {
        return <span className="text-[12px] whitespace-nowrap text-slate-400">Sin videos</span>;
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Ver los videos de ${name}`}
                className="bg-secondary/8 text-secondary hover:bg-secondary/15 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap transition-colors duration-150"
            >
                <FaCirclePlay aria-hidden="true" className="size-3.5" />
                {videos.length} {videos.length === 1 ? 'video' : 'videos'}
            </button>

            <MediaPreviewModal
                open={open}
                onClose={() => setOpen(false)}
                title={`Videos de ${name}`}
                items={videos.map((video) => ({ type: 'video', src: `${baseUrl}/${video}` }))}
            />
        </>
    );
};
