import { ReactNode } from 'react';
import { FaRegCalendar } from 'react-icons/fa6';
import { BulkCheckbox } from './BulkSelection';

/** Lista de tarjetas que reemplaza a la tabla por debajo de 768px. */
export const TableCardList = ({ children }: { children: ReactNode }) => {
    return <div className="flex flex-col gap-2.5 md:hidden">{children}</div>;
};

type TTableCardProps = {
    id: string;
    title: ReactNode;
    /** Miniatura a la izquierda (imagen, logo o placeholder). */
    media?: ReactNode;
    /** Filas "Etiqueta: valor" o contenido libre bajo el titulo. */
    meta?: { label: string; value: ReactNode }[];
    extra?: ReactNode;
    date?: string;
    actions: ReactNode;
    /** Etiqueta accesible del checkbox de seleccion. */
    selectLabel: string;
};

export const TableCard = ({ id, title, media, meta = [], extra, date, actions, selectLabel }: TTableCardProps) => {
    return (
        <article className="bg-primary has-[.bulk-select:checked]:border-secondary relative flex flex-col gap-2.5 rounded-[9px] border border-transparent p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] has-[.bulk-select:checked]:shadow-[0_4px_12px_rgba(24,96,140,0.15)]">
            <div className="flex items-start gap-3">
                <span className="self-center">
                    <BulkCheckbox id={id} label={selectLabel} />
                </span>

                {media && (
                    <div className="shrink-0 self-center">
                        {media}
                    </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col gap-0.75">
                    <h3 className="text-ink m-0 text-[15px] leading-[1.3] font-semibold wrap-break-word">{title}</h3>

                    <div className="text-[12.5px] leading-[1.4] text-gray-600">
                        {meta.map(({ label, value }) => (
                            <div key={label} className="mt-0.75 flex items-center gap-1.25">
                                <strong className="text-ink font-semibold">{label}:</strong>
                                <span className="min-w-0">{value}</span>
                            </div>
                        ))}
                        {extra && <div className="mt-0.75">{extra}</div>}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2.5 border-t border-slate-100 pt-2.5">
                <span className="inline-flex items-center gap-1.25 text-[12px] text-gray-600">
                    {date && (
                        <>
                            <FaRegCalendar aria-hidden="true" className="size-3" />
                            {date}
                        </>
                    )}
                </span>

                <div className="flex items-center gap-1.25">{actions}</div>
            </div>
        </article>
    );
};
