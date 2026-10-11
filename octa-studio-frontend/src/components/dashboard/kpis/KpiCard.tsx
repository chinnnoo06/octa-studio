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
            className={`relative flex min-w-0 flex-col gap-1 rounded-[10px] p-4.5 shadow-[0_4px_10px_rgba(0,0,0,0.05)] ${accent ? 'bg-[linear-gradient(135deg,#18608C,#0f4566)]' : 'bg-primary'}`}
        >
            <span className={`group/tip relative text-[12px] font-semibold tracking-[0.3px] uppercase ${accent ? 'text-primary' : 'text-gray-600'}`}>
                {label}
                {tip && <InfoTip text={tip} light={accent} />}
            </span>

            <span className={`text-[28px] leading-[1.1] font-black ${accent ? 'text-primary' : 'text-ink'}`}>{value}</span>

            {sub && <span className={`text-[12px] ${accent ? 'text-primary/85' : 'text-gray-600'}`}>{sub}</span>}
        </div>
    );
};
