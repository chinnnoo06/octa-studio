import { FaChevronDown } from 'react-icons/fa6';
import type { TDashboard } from '@/schemas/analytics/analytics.schemas';
import { formatNumber } from '@/utils/admin/formatMetrics';

const PAGES_PER_SOURCE = 5;

/** Acordeon de canales (organico, directo, redes...) con sus paginas de entrada. */
export const TrafficList = ({ traffic }: { traffic: TDashboard['trafficSources'] }) => {
    const sources = Object.entries(traffic.sources);

    if (sources.length === 0) {
        return (
            <p className="m-0 flex min-h-40 items-center justify-center rounded-xl border-2 border-dashed border-fourth-admin/30 p-5 text-center text-xs lg:text-sm text-fourth-admin/75">
                Sin datos de tráfico.
            </p>
        );
    }

    const total = traffic.totalSessions > 0 ? traffic.totalSessions : 1;

    return (
        <div className="flex flex-col gap-1.5">
            {sources.map(([name, source]) => {
                const pct = (source.totalVisits / total) * 100;
                const pages = [...source.pages].sort((a, b) => b.visits - a.visits).slice(0, PAGES_PER_SOURCE);

                return (
                    <details key={name} className="group rounded-xl border border-fourth-admin/30 transition-shadow duration-200 hover:shadow-[0_2px_8px_color-mix(in_srgb,var(--color-fourth-admin)_6%,transparent)]">
                        <summary className="flex cursor-pointer list-none flex-col gap-2.5 px-5 py-2.5 group-open:bg-thrird-admin/50 md:flex-row md:items-center md:justify-between [&::-webkit-details-marker]:hidden">
                            <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:pr-5">
                                <span className="text-fourth-admin text-sm lg:text-base font-semibold">{name}</span>
                                <div className="h-2 rounded-xl bg-thrird-admin">
                                    <div className="h-full rounded-xl bg-secondary-admin" style={{ width: `${pct.toFixed(1)}%` }} />
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2.5 text-xs lg:text-sm text-fourth-admin/75">
                                <strong className="text-fourth-admin text-sm lg:text-base">{formatNumber(source.totalVisits)}</strong>
                                <span>{pct.toFixed(1)}%</span>
                                <FaChevronDown aria-hidden="true" className="size-4 lg:size-4.5 transition-transform duration-200 group-open:rotate-180" />
                            </div>
                        </summary>

                        <ul role="list" className="m-0 list-none border-t border-fourth-admin/30 bg-thrird-admin/50 pt-1.5 pr-5 pb-2.5 pl-10">
                            {pages.map((page) => (
                                <li key={page.url} className="flex justify-between gap-2.5 py-1.5 text-xs lg:text-sm text-fourth-admin/75 not-last:border-b not-last:border-dashed not-last:border-fourth-admin/30">
                                    <span title={page.url} className="min-w-0 truncate">{page.url}</span>
                                    <span className="shrink-0 font-semibold">{formatNumber(page.visits)}</span>
                                </li>
                            ))}
                        </ul>
                    </details>
                );
            })}
        </div>
    );
};
