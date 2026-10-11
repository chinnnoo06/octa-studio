import { FaCircleInfo } from 'react-icons/fa6';
import type { TDashboard } from '@/schemas/analytics/analytics.schemas';

const SOURCE_NAMES = { ga: 'Google Analytics', searchConsole: 'Search Console', posthog: 'PostHog' } as const;

const NOTE = 'mb-3.75 -mt-1.25 flex items-start gap-1.75 text-[12px] leading-[1.45] text-gray-600';

/** Avisos bajo la barra de filtros: datos parciales, retraso de "Hoy" y fuentes por conectar. */
export const DashboardNotices = ({ dashboard }: { dashboard: TDashboard | null }) => {
    if (!dashboard) return null;

    const off = (Object.keys(SOURCE_NAMES) as (keyof typeof SOURCE_NAMES)[])
        .filter((key) => dashboard.sources[key] === 'off')
        .map((key) => SOURCE_NAMES[key]);

    return (
        <>
            {dashboard.partial && (
                <div className="mb-5 rounded-[8px] border border-[#ffe0a3] bg-[#fff8e1] px-3.75 py-2.5 text-[13px] text-[#8a6d3b]">
                    Algunos datos no se pudieron cargar completamente y no se guardaron en caché. Se reintentará en la próxima carga.
                </div>
            )}

            {off.length > 0 && (
                <div className={NOTE}>
                    <FaCircleInfo aria-hidden="true" className="text-secondary mt-0.5 size-3.25 shrink-0" />
                    <span>
                        Pendiente de conectar: <strong className="text-ink font-semibold">{off.join(', ')}</strong>. Sus gráficas
                        aparecerán vacías hasta que se configuren las credenciales en el backend.
                    </span>
                </div>
            )}

            {dashboard.period === 'hoy' && (
                <div className={NOTE}>
                    <FaCircleInfo aria-hidden="true" className="text-secondary mt-0.5 size-3.25 shrink-0" />
                    <span>
                        Google Analytics procesa los datos de hoy con varias horas de retraso (Search Console, con 2-3 días);
                        sus gráficas pueden verse vacías durante el día. Las <strong className="text-ink font-semibold">conversiones</strong> y
                        el contador <strong className="text-ink font-semibold">en línea</strong> sí son inmediatos.
                    </span>
                </div>
            )}
        </>
    );
};
