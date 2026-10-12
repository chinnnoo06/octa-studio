import Link from 'next/link';
import { formatNumber } from '@/utils/admin/formatMetrics';

export type TRankItem = {
    label: string;
    value: number;
    /** Enlace del texto; `external` lo abre en otra pestaña (paginas publicas). */
    href?: string;
    external?: boolean;
};

type TRankListProps = {
    items: TRankItem[];
    emptyMessage: string;
};

/** Ranking con barra proporcional al primero: paginas, articulos mas vistos. */
export const RankList = ({ items, emptyMessage }: TRankListProps) => {
    if (items.length === 0) {
        return <p className="text-xs lg:text-sm text-fourth-admin/75">{emptyMessage}</p>;
    }

    const max = Math.max(...items.map((item) => item.value)) || 1;

    return (
        <ul role="list" className="m-0 flex list-none flex-col gap-2.5 p-0">
            {items.map((item, i) => {
                const text = 'text-fourth-admin min-w-0 truncate';

                return (
                    <li key={`${item.label}-${i}`} className="grid grid-cols-[minmax(0,1fr)_80px_auto] items-center gap-2.5 text-xs lg:text-sm">
                        {item.href ? (
                            <Link
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener' : undefined}
                                title={item.label}
                                className={`${text} hover:text-secondary-admin`}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span title={item.label} className={text}>{item.label}</span>
                        )}

                        <div className="h-2 overflow-hidden rounded-[4px] bg-thrird-admin">
                            <div
                                className="bg-secondary-admin h-full rounded-[4px] transition-[width] duration-500"
                                style={{ width: `${((item.value / max) * 100).toFixed(1)}%` }}
                            />
                        </div>

                        <span className="text-fourth-admin min-w-10 text-right font-semibold">{formatNumber(item.value)}</span>
                    </li>
                );
            })}
        </ul>
    );
};
