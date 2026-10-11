'use client';

import type { TDashboardPeriod } from '@/schemas/enums.schemas';

const PERIODS: { value: TDashboardPeriod; label: string }[] = [
    { value: 'hoy', label: 'Hoy' },
    { value: 'mes', label: 'Este mes' },
    { value: '7dias', label: '7 días' },
    { value: '30dias', label: '30 días' },
    { value: '6meses', label: '6 meses' },
    { value: '12meses', label: '12 meses' },
    { value: 'todo', label: 'Todo' },
];

type TPeriodSelectorProps = {
    active: TDashboardPeriod;
    onSelect: (period: TDashboardPeriod) => void;
};

/** Pastillas de periodo: rejilla de 4 en movil, fila en escritorio. */
export const PeriodSelector = ({ active, onSelect }: TPeriodSelectorProps) => {
    return (
        <div role="group" aria-label="Periodo" className="grid grid-cols-4 gap-1.25 rounded-[10px] bg-[#eef1f4] p-1.25 md:flex md:flex-nowrap">
            {PERIODS.map(({ value, label }) => {
                const isActive = value === active;

                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onSelect(value)}
                        aria-pressed={isActive}
                        className={`cursor-pointer rounded-[7px] px-3 py-2 text-center text-[13px] font-semibold whitespace-nowrap transition-all duration-200 md:flex-none ${isActive
                            ? 'bg-primary text-secondary shadow-[0_2px_6px_rgba(0,0,0,0.08)]'
                            : 'hover:text-ink text-gray-600'
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
