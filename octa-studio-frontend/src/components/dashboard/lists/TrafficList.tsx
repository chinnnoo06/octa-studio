import { FaChevronDown } from 'react-icons/fa6';
import type { TDashboard } from '@/schemas/analytics/analytics.schemas';
import { formatNumber } from '@/utils/formatMetrics';

const PAGES_PER_SOURCE = 5;

/** Acordeon de canales (organico, directo, redes...) con sus paginas de entrada. */
export const TrafficList = ({ traffic }: { traffic: TDashboard['trafficSources'] }) => {
    const sources = Object.entries(traffic.sources);

    if (sources.length === 0) {
        return (
            <p className="m-0 flex min-h-40 items-center justify-center rounded-[8px] border-2 border-dashed border-[#e3e7eb] p-5 text-center text-[13px] text-gray-600">
                Sin datos de tráfico.
            </p>
        );
    }

    const total = traffic.totalSessions > 0 ? traffic.totalSessions : 1;

    return (
        <div className="flex flex-col gap-1.25">
            {sources.map(([name, source]) => {
                const pct = (source.totalVisits / total) * 100;
                const pages = [...source.pages].sort((a, b) => b.visits - a.visits).slice(0, PAGES_PER_SOURCE);

                return (
                    <details key={name} className="group rounded-[8px] border border-[#eef1f4] transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                        <summary className="flex cursor-pointer list-none flex-col gap-2.5 px-3.75 py-3 group-open:bg-[#f8f9fa] md:flex-row md:items-center md:justify-between [&::-webkit-details-marker]:hidden">
                            <div className="flex min-w-0 flex-1 flex-col gap-1.75 md:pr-3.75">
                                <span className="text-ink text-[14px] font-semibold">{name}</span>
                                <div className="h-2 rounded-[4px] bg-[#eef1f4]">
                                    <div className="h-full rounded-[4px] bg-[#3498db]" style={{ width: `${pct.toFixed(1)}%` }} />
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3 text-[13px] text-gray-600">
                                <strong className="text-ink text-[15px]">{formatNumber(source.totalVisits)}</strong>
                                <span>{pct.toFixed(1)}%</span>
                                <FaChevronDown aria-hidden="true" className="size-3 transition-transform duration-200 group-open:rotate-180" />
                            </div>
                        </summary>

                        <ul role="list" className="m-0 list-none border-t border-[#eef1f4] bg-[#f8f9fa] pt-1.25 pr-3.75 pb-2.5 pl-7.5">
                            {pages.map((page) => (
                                <li key={page.url} className="flex justify-between gap-2.5 py-1.75 text-[12.5px] text-gray-600 not-last:border-b not-last:border-dashed not-last:border-[#e3e7eb]">
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
