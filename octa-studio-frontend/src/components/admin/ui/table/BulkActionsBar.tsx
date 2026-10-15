'use client';

import { useState } from 'react';
import { FaCircleCheck, FaTrashCan, FaXmark } from 'react-icons/fa6';
import { ConfirmationModal } from '@/components/admin/ui/ConfirmationModal';
import { useBulkSelection } from './BulkSelection';

type TBulkActionsBarProps = {
    onDelete: (ids: string[]) => Promise<boolean | undefined>;
    loading: boolean;
};

const BTN =
    'inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2.5 py-2.5 text-center text-xs lg:text-sm leading-tight font-semibold transition-all duration-150 md:py-1.5 md:whitespace-nowrap';

export const BulkActionsBar = ({ onDelete, loading }: TBulkActionsBarProps) => {
    const { selected, clear } = useBulkSelection();
    const [confirming, setConfirming] = useState(false);

    const visible = selected.length > 0;

    const confirm = async () => {
        const ok = await onDelete(selected);
        setConfirming(false);
        if (ok) clear();
    };

    return (
        <>
            <div
                role="region"
                aria-label="Acciones masivas"
                inert={!visible}
                className={`bg-fourth-admin text-primary-admin fixed inset-x-0 bottom-0 z-95 flex flex-col items-stretch gap-2.5 px-2.5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] shadow-[0_-6px_24px_color-mix(in_srgb,var(--color-fourth-admin)_18%,transparent)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] md:inset-x-auto md:bottom-5 md:left-1/2 md:w-auto md:max-w-[calc(100vw-2rem)] md:-translate-x-1/2 md:flex-row md:items-center md:rounded-xl md:py-2.5 md:shadow-[0_10px_30px_color-mix(in_srgb,var(--color-fourth-admin)_28%,transparent)] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[120%] opacity-0'}`}
            >
                <span className="flex shrink-0 items-center justify-center gap-1.5 text-xs lg:text-sm font-semibold md:justify-start">
                    <FaCircleCheck aria-hidden="true" className="text-primary-admin/75 size-4 lg:size-4.5" />
                    <span className="bg-secondary-admin min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs lg:text-sm">{selected.length}</span>
                    <span>seleccionado(s)</span>
                </span>

                <span aria-hidden="true" className="bg-primary-admin/15 hidden h-5.5 w-px md:block" />

                <div className="grid grid-cols-2 gap-1.5 md:flex md:items-center md:gap-2.5">
                    <button type="button" onClick={clear} className={`${BTN} text-primary-admin/75 bg-primary-admin/6 hover:bg-primary-admin/14 hover:text-primary-admin`}>
                        <FaXmark aria-hidden="true" className="size-4 lg:size-4.5 shrink-0" />
                        Cancelar
                    </button>

                    <button type="button" onClick={() => setConfirming(true)} className={`${BTN} text-primary-admin bg-red-700 hover:bg-red-800`}>
                        <FaTrashCan aria-hidden="true" className="size-4 lg:size-4.5 shrink-0" />
                        Eliminar seleccionados
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirming}
                onClose={() => setConfirming(false)}
                onConfirm={confirm}
                loading={loading}
                title="Confirmar eliminación masiva"
                context={
                    <>
                        ¿Eliminar <strong className="text-fourth-admin">{selected.length}</strong> registro(s) seleccionado(s)?
                        Esta acción no se puede deshacer y borrará también todos los archivos asociados.
                    </>
                }
            />
        </>
    );
};
