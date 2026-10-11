'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PanelButton } from '@/components/ui/buttons/PanelButton';

/** Las analiticas no respondieron: el resto del panel sigue y se puede reintentar. */
export const DashboardError = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <div className="bg-primary col-span-full flex flex-col items-center gap-3.75 rounded-[10px] border-2 border-dashed border-[#f1c0c0] px-5 py-10 text-center">
            <p className="m-0 max-w-105 text-[15px] text-gray-600">
                No se pudieron cargar las analíticas. Puede ser un límite temporal de Google Analytics o que el backend no esté disponible.
            </p>

            <PanelButton onClick={() => startTransition(() => router.refresh())}>
                {isPending ? 'Reintentando...' : 'Reintentar'}
            </PanelButton>
        </div>
    );
};
