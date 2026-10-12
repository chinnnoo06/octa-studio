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
        <div role="group" aria-label="Periodo" className="grid grid-cols-4 gap-1.5 rounded-xl bg-thrird-admin p-1.5 md:flex md:flex-nowrap">
            {PERIODS.map(({ value, label }) => {
                const isActive = value === active;

                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onSelect(value)}
                        aria-pressed={isActive}
                        className={`cursor-pointer rounded-xl px-2.5 py-2.5 text-center text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-200 md:flex-none ${isActive
                            ? 'bg-primary-admin text-secondary-admin shadow-[0_2px_6px_color-mix(in_srgb,var(--color-fourth-admin)_8%,transparent)]'
                            : 'hover:text-fourth-admin text-fourth-admin/75'
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
