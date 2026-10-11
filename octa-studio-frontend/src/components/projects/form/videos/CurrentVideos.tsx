import { MEDIA_GRID, MediaTile } from '@/components/ui/form/MediaTile';

export const CurrentVideos = ({ videos, name }: { videos: string[]; name: string }) => {
    if (videos.length === 0) {
        return <p className="text-[13px] text-gray-600 italic">Este proyecto no tiene videos.</p>;
    }

    return (
        <ul role="list" className={MEDIA_GRID}>
            {videos.map((video, i) => (
                <li key={video}>
                    <MediaTile>
                        <video
                            src={`${process.env.NEXT_PUBLIC_PROJECTS_VIDEO_URL}/${video}`}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            aria-label={`Video ${i + 1} de ${name}`}
                            className="h-full w-full bg-slate-800 object-cover"
                        />
                    </MediaTile>
                </li>
            ))}
        </ul>
    );
};
