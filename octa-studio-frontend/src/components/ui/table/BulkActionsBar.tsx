'use client';

import { useState } from 'react';
import { FaCircleCheck, FaTrashCan, FaXmark } from 'react-icons/fa6';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useBulkSelection } from './BulkSelection';

type TBulkActionsBarProps = {
    /** Borra los ids marcados; `true` si salio bien (entonces se limpia la seleccion). */
    onDelete: (ids: string[]) => Promise<boolean | undefined>;
    loading: boolean;
};

const BTN =
    'inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.25 rounded-[6px] px-2.5 py-2 text-center text-[12.5px] leading-tight font-semibold transition-all duration-150 md:px-3 md:py-1.75 md:text-[13px] md:whitespace-nowrap';

/**
 * Barra flotante que aparece al marcar filas: pildora centrada en escritorio,
 * franja pegada al borde inferior en movil.
 */
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
                className={`bg-ink text-primary fixed inset-x-0 bottom-0 z-95 flex flex-col items-stretch gap-2.25 px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] shadow-[0_-6px_24px_rgba(15,23,42,0.18)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] md:inset-x-auto md:bottom-5 md:left-1/2 md:w-auto md:max-w-[calc(100vw-2rem)] md:-translate-x-1/2 md:flex-row md:items-center md:gap-3 md:rounded-[10px] md:px-3.5 md:py-2.5 md:shadow-[0_10px_30px_rgba(15,23,42,0.28)] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[120%] opacity-0'}`}
            >
                <span className="flex shrink-0 items-center justify-center gap-1.25 text-[13px] font-semibold md:justify-start md:text-[13.5px]">
                    <FaCircleCheck aria-hidden="true" className="text-panel-link size-3.5" />
                    <span className="bg-secondary min-w-6 rounded-full px-1.75 py-0.5 text-center text-[12px]">{selected.length}</span>
                    <span>seleccionado(s)</span>
                </span>

                <span aria-hidden="true" className="bg-primary/15 hidden h-5.5 w-px md:block" />

                <div className="grid grid-cols-2 gap-1.75 md:flex md:items-center md:gap-2.5">
                    <button type="button" onClick={clear} className={`${BTN} text-primary/85 bg-primary/6 hover:bg-primary/14 hover:text-primary`}>
                        <FaXmark aria-hidden="true" className="size-3.25 shrink-0" />
                        Cancelar
                    </button>

                    <button type="button" onClick={() => setConfirming(true)} className={`${BTN} text-primary bg-red-700 hover:bg-red-800`}>
                        <FaTrashCan aria-hidden="true" className="size-3.25 shrink-0" />
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
                        ¿Eliminar <strong className="text-ink">{selected.length}</strong> registro(s) seleccionado(s)?
                        Esta acción no se puede deshacer y borrará también todos los archivos asociados.
                    </>
                }
            />
        </>
    );
};
