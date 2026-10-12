import { ReactNode } from 'react';

const TONE = {
    success: 'bg-[rgba(46,125,49,0.12)] text-[#1b5e20]',
    warning: 'bg-[rgba(251,192,45,0.18)] text-[#856404]',
    neutral: 'bg-thrird-admin text-fourth-admin/75',
} as const;

type TStatusBadgeProps = {
    children: ReactNode;
    tone?: keyof typeof TONE;
};

/** Pildora de estado de las tablas (Publicado, Borrador...). */
export const StatusBadge = ({ children, tone = 'neutral' }: TStatusBadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs lg:text-sm font-semibold whitespace-nowrap ${TONE[tone]}`}>
            {children}
        </span>
    );
};
