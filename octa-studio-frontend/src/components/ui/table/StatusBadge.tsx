import { ReactNode } from 'react';

const TONE = {
    success: 'bg-[rgba(46,125,49,0.12)] text-[#1b5e20]',
    warning: 'bg-[rgba(251,192,45,0.18)] text-[#856404]',
    neutral: 'bg-slate-100 text-gray-600',
} as const;

type TStatusBadgeProps = {
    children: ReactNode;
    tone?: keyof typeof TONE;
};

/** Pildora de estado de las tablas (Publicado, Borrador...). */
export const StatusBadge = ({ children, tone = 'neutral' }: TStatusBadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.25 py-0.75 text-[11.5px] font-semibold whitespace-nowrap ${TONE[tone]}`}>
            {children}
        </span>
    );
};
