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
    media?: ReactNode;
    meta?: { label: string; value: ReactNode }[];
    extra?: ReactNode;
    date?: string;
    actions: ReactNode;
    selectLabel: string;
};

export const TableCard = ({ id, title, media, meta = [], extra, date, actions, selectLabel }: TTableCardProps) => {
    return (
        <article className="bg-primary-admin has-[.bulk-select:checked]:border-secondary-admin relative flex flex-col gap-2.5 rounded-xl border border-fourth-admin/30 p-2.5 shadow-lg">
            <div className="flex items-start gap-2.5">
                <span className="self-center">
                    <BulkCheckbox id={id} label={selectLabel} />
                </span>

                {media && (
                    <div className="shrink-0 self-center">
                        {media}
                    </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h3 className="text-fourth-admin m-0 text-sm lg:text-base leading-[1.3] font-semibold wrap-break-word">{title}</h3>

                    <div className="text-xs lg:text-sm leading-[1.4] text-fourth-admin/75">
                        {meta.map(({ label, value }) => (
                            <div key={label} className="mt-0.5 flex items-center gap-1.5">
                                <strong className="text-fourth-admin font-semibold">{label}:</strong>
                                <span className="min-w-0">{value}</span>
                            </div>
                        ))}
                        {extra && <div className="mt-0.5">{extra}</div>}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2.5 border-t border-fourth-admin/30 pt-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs lg:text-sm text-fourth-admin/75">
                    {date && (
                        <>
                            <FaRegCalendar aria-hidden="true" className="size-4 lg:size-4.5" />
                            {date}
                        </>
                    )}
                </span>

                <div className="flex items-center gap-1.5">{actions}</div>
            </div>
        </article>
    );
};
