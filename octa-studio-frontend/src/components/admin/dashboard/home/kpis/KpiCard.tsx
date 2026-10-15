import { InfoTip } from '../InfoTip';

type TKpiCardProps = {
    label: string;
    value: string;
    sub?: string;
    tip?: string;
    /** Tarjeta destacada en azul (conversiones, vistas totales). */
    accent?: boolean;
};

export const KpiCard = ({ label, value, sub, tip, accent = false }: TKpiCardProps) => {
    return (
        <div
            className={`relative flex min-w-0 flex-col gap-1.5 rounded-xl border p-5 shadow-lg ${accent ? 'bg-linear-135 from-secondary-admin to-secondary-admin/75 border-secondary-admin' : 'bg-primary-admin border-fourth-admin/30'}`}
        >
            <span className={`group/tip relative text-xs lg:text-sm font-semibold tracking-[0.3px] uppercase ${accent ? 'text-primary-admin' : 'text-fourth-admin/75'}`}>
                {label}
                {tip && <InfoTip text={tip} light={accent} />}
            </span>

            <span className={`text-2xl lg:text-3xl leading-[1.1] font-black ${accent ? 'text-primary-admin' : 'text-fourth-admin'}`}>{value}</span>

            {sub && <span className={`text-xs lg:text-sm ${accent ? 'text-primary-admin/75' : 'text-fourth-admin/75'}`}>{sub}</span>}
        </div>
    );
};
