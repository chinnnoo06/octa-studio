import { ReactNode } from 'react';
import Link from 'next/link';
import { InfoTip } from './InfoTip';

/** De donde sale el dato de cada tarjeta. */
const SOURCE = {
    ga: { label: 'Google Analytics', className: 'bg-[rgba(66,133,244,0.12)] text-[#4285F4]' },
    gsc: { label: 'Search Console', className: 'bg-[rgba(52,168,83,0.12)] text-[#188038]' },
    ph: { label: 'PostHog', className: 'bg-secondary/12 text-secondary' },
} as const;

const BADGE = 'shrink-0 rounded-full px-2.25 py-0.75 text-[10px] font-semibold whitespace-nowrap';

type TDashCardProps = {
    title: string;
    tip?: string;
    source?: keyof typeof SOURCE;
    /** Enlace a la derecha en lugar de la fuente (p. ej. "Administrar"). */
    link?: { href: string; label: string };
    /** Ocupa las dos columnas del grid. */
    full?: boolean;
    children: ReactNode;
};

/** Tarjeta blanca de cada grafica o lista del dashboard. */
export const DashCard = ({ title, tip, source, link, full = false, children }: TDashCardProps) => {
    return (
        <div className={`bg-primary flex min-w-0 flex-col rounded-[10px] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.05)] ${full ? 'col-span-full' : ''}`}>
            <div className="mb-3.75 flex items-center justify-between gap-2.5">
                <h3 className="group/tip text-ink relative m-0 text-[15px] font-semibold">
                    {title}
                    {tip && <InfoTip text={tip} />}
                </h3>

                {source && <span className={`${BADGE} ${SOURCE[source].className}`}>{SOURCE[source].label}</span>}

                {link && (
                    <Link href={link.href} className={`${BADGE} text-ink bg-slate-100 hover:bg-slate-200`}>
                        {link.label}
                    </Link>
                )}
            </div>

            {children}
        </div>
    );
};
