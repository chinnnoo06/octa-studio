export const CurrentVideos = ({ videos, name }: { videos: string[]; name: string }) => {
    if (videos.length === 0) {
        return <p className="text-fourth/75 text-xs lg:text-sm">Este proyecto no tiene videos.</p>;
    }

    return (
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, i) => (
                <li key={video}>
                    <video
                        src={`${process.env.NEXT_PUBLIC_PROJECTS_VIDEO_URL}/${video}`}
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={`Video ${i + 1} de ${name}`}
                        className="border-secondary/30 aspect-video w-full rounded-lg border bg-black object-contain"
                    />
                </li>
            ))}
        </ul>
    );
};
