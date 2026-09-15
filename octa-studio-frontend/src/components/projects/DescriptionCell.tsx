'use client';

import { useEffect, useRef, useState } from 'react';

export const DescriptionCell = ({ description }: { description: string }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const measure = () => {
            if (expanded) return;
            setIsClamped(el.scrollHeight > el.clientHeight);
        };

        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(el);

        return () => observer.disconnect();
    }, [description, expanded]);

    return (
        <div className="flex max-w-100 flex-col items-start gap-1">
            <p ref={ref} className={expanded ? '' : 'line-clamp-2'}>
                {description}
            </p>

            {(isClamped || expanded) && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="text-secondary hover:text-secondary/75 cursor-pointer text-xs font-medium underline underline-offset-2 transition-colors duration-300"
                >
                    {expanded ? 'Ver menos' : 'Ver más'}
                </button>
            )}
        </div>
    );
};
