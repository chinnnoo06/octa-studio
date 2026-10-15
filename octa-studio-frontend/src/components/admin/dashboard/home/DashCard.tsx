import { ReactNode } from 'react';
import Link from 'next/link';
import { InfoTip } from './InfoTip';

/** De donde sale el dato de cada tarjeta. */
const SOURCE = {
    ga: { label: 'Google Analytics', className: 'bg-[rgba(66,133,244,0.12)] text-[#4285F4]' },
    gsc: { label: 'Search Console', className: 'bg-[rgba(52,168,83,0.12)] text-[#188038]' },
    ph: { label: 'PostHog', className: 'bg-secondary-admin/12 text-secondary-admin' },
} as const;

const BADGE = 'shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap';

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
        <div className={`bg-primary-admin flex min-w-0 flex-col rounded-xl border border-fourth-admin/30 p-5 shadow-lg ${full ? 'col-span-full' : ''}`}>
            <div className="mb-5 flex items-center justify-between gap-2.5">
                <h3 className="group/tip text-fourth-admin relative m-0 text-sm lg:text-base font-semibold">
                    {title}
                    {tip && <InfoTip text={tip} />}
                </h3>

                {source && <span className={`${BADGE} ${SOURCE[source].className}`}>{SOURCE[source].label}</span>}

                {link && (
                    <Link href={link.href} className={`${BADGE} text-fourth-admin bg-thrird-admin hover:bg-fourth-admin/10`}>
                        {link.label}
                    </Link>
                )}
            </div>

            {children}
        </div>
    );
};
