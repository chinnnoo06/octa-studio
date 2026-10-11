'use client';

import type { TAdminListParams, TFilterField } from '@/types/common.types';

type TTableFiltersProps = {
    id: string;
    open: boolean;
    fields: TFilterField[];
    params: TAdminListParams;
    onApply: (values: TAdminListParams) => void;
};

const LABEL = 'text-[12px] font-semibold tracking-[0.3px] text-gray-600 uppercase';

const CONTROL =
    'text-ink bg-primary focus:border-secondary w-full min-w-0 cursor-pointer rounded-[6px] border border-slate-200 px-3 py-2.25 text-[13.5px] transition-all duration-200 outline-none hover:border-slate-300 focus:shadow-[0_0_0_3px_rgba(24,96,140,0.12)]';

/** Claves que el panel maneja como filtros (las de fecha incluidas). */
const filterKeys = (fields: TFilterField[]) =>
    fields.flatMap((f) => (f.type === 'select' ? [f.name] : ['from', 'to']));

/** Panel desplegable de filtros. Aplica al enviar; "Limpiar" vacia todos los filtros. */
export const TableFilters = ({ id, open, fields, params, onApply }: TTableFiltersProps) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onApply(Object.fromEntries(filterKeys(fields).map((key) => [key, String(data.get(key) ?? '') || undefined])));
    };

    const onClear = () => onApply(Object.fromEntries(filterKeys(fields).map((key) => [key, undefined])));

    return (
        <div
            id={id}
            inert={!open}
            className={`bg-primary overflow-hidden rounded-[10px] border border-slate-200 transition-all duration-300 ${open ? 'mb-5 max-h-125 p-5 opacity-100 shadow-[0_4px_10px_rgba(0,0,0,0.04)]' : 'mb-0 max-h-0 border-transparent p-0 opacity-0'}`}
        >
            {/* `key` reinicia los valores por defecto cuando cambia la URL. */}
            <form key={JSON.stringify(params)} onSubmit={onSubmit} className="grid grid-cols-1 gap-3.75 md:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4">
                {fields.map((field) =>
                    field.type === 'select' ? (
                        <div key={field.name} className="flex flex-col gap-1.5">
                            <label htmlFor={`filter-${field.name}`} className={LABEL}>{field.label}</label>
                            <select
                                id={`filter-${field.name}`}
                                name={field.name}
                                defaultValue={params[field.name] ?? ''}
                                className={`${CONTROL} select-arrow pr-7.5`}
                            >
                                <option value="">Todos</option>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        [
                            { name: 'from', label: 'Desde' },
                            { name: 'to', label: 'Hasta' },
                        ].map(({ name, label }) => (
                            <div key={name} className="flex flex-col gap-1.5">
                                <label htmlFor={`filter-${name}`} className={LABEL}>{label}</label>
                                <input
                                    type="date"
                                    id={`filter-${name}`}
                                    name={name}
                                    defaultValue={params[name] ?? ''}
                                    className={CONTROL}
                                />
                            </div>
                        ))
                    ),
                )}

                <div className="col-span-full mt-1.25 flex justify-end gap-2.5 border-t border-slate-100 pt-2.5">
                    <button
                        type="button"
                        onClick={onClear}
                        className="hover:text-ink cursor-pointer rounded-[6px] px-4 py-2 text-[13px] font-semibold text-gray-600 transition-all duration-200 hover:bg-slate-100"
                    >
                        Limpiar
                    </button>
                    <button
                        type="submit"
                        className="bg-secondary text-primary cursor-pointer rounded-[6px] px-4 py-2 text-[13px] font-semibold transition-all duration-200 hover:bg-[#145378]"
                    >
                        Aplicar filtros
                    </button>
                </div>
            </form>
        </div>
    );
};
