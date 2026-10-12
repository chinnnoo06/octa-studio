'use client';

import type { TAdminListParams, TFilterField } from '@/types/common.types';

type TTableFiltersProps = {
    id: string;
    open: boolean;
    fields: TFilterField[];
    params: TAdminListParams;
    onApply: (values: TAdminListParams) => void;
};

const LABEL = 'text-xs lg:text-sm font-semibold tracking-[0.3px] text-fourth-admin/75 uppercase';

const CONTROL =
    'text-fourth-admin bg-primary-admin focus:border-secondary-admin w-full min-w-0 cursor-pointer rounded-xl border border-fourth-admin/30 px-2.5 py-2.5 text-xs lg:text-sm transition-all duration-200 outline-none hover:border-fourth-admin/75 focus:shadow-lg';

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
            className={`bg-primary-admin overflow-hidden rounded-[10px] border border-fourth-admin/30 transition-all duration-300 ${open ? 'mb-5 max-h-125 p-5 opacity-100 shadow-lg' : 'mb-0 max-h-0 border-transparent p-0 opacity-0'}`}
        >
            {/* `key` reinicia los valores por defecto cuando cambia la URL. */}
            <form key={JSON.stringify(params)} onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4">
                {fields.map((field) =>
                    field.type === 'select' ? (
                        <div key={field.name} className="flex flex-col gap-1.5">
                            <label htmlFor={`filter-${field.name}`} className={LABEL}>{field.label}</label>
                            <select
                                id={`filter-${field.name}`}
                                name={field.name}
                                defaultValue={params[field.name] ?? ''}
                                className={`${CONTROL} select-arrow pr-10`}
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

                <div className="col-span-full mt-1.5 flex justify-end gap-2.5 border-t border-fourth-admin/30 pt-2.5">
                    <button
                        type="button"
                        onClick={onClear}
                        className="hover:text-fourth-admin cursor-pointer rounded-xl px-5 py-2.5 text-xs lg:text-sm font-semibold text-fourth-admin/75 transition-all duration-200 hover:bg-thrird-admin"
                    >
                        Limpiar
                    </button>
                    <button
                        type="submit"
                        className="bg-secondary-admin text-primary-admin cursor-pointer rounded-xl hover:shadow-lg px-5 py-2.5 text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-secondary-admin/90"
                    >
                        Aplicar filtros
                    </button>
                </div>
            </form>
        </div>
    );
};
