'use client';

import { ReactNode, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { TDashboardPeriod } from '@/schemas/enums.schemas';
import { ADMIN_HOME } from '@/utils/data/admin';
import { RealtimeUsers } from './toolbar/RealtimeUsers';
import { PeriodSelector } from './toolbar/PeriodSelector';

type TDashboardShellProps = {
    period: TDashboardPeriod;
    /** Avisos bajo la barra (datos parciales, "Hoy", fuentes sin conectar). */
    notices?: ReactNode;
    children: ReactNode;
};

/**
 * Barra de filtros y rejilla del dashboard. Cambiar de periodo cambia la URL
 * (`?period=`) y el servidor vuelve a pintar las graficas; mientras tanto la
 * rejilla muestra el spinner encima de los datos anteriores.
 */
export const DashboardShell = ({ period, notices, children }: TDashboardShellProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [selected, setSelected] = useState(period);

    const onSelect = (next: TDashboardPeriod) => {
        if (next === selected && !isPending) return;

        setSelected(next);
        startTransition(() => router.replace(`${ADMIN_HOME}?period=${next}`, { scroll: false }));
    };

    return (
        <>
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <RealtimeUsers />
                <PeriodSelector active={isPending ? selected : period} onSelect={onSelect} />
            </div>

            {notices}

            <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2" aria-busy={isPending}>
                {children}

                {isPending && (
                    <div className="absolute inset-0 z-5 flex items-start justify-center rounded-xl bg-thrird-admin/60 pt-30 backdrop-blur-[1px]">
                        <div aria-label="Cargando" className="border-t-secondary-admin size-11 animate-spin rounded-full border-4 border-fourth-admin/30" />
                    </div>
                )}
            </div>
        </>
    );
};
