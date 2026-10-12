'use client';

import { FaXmark } from 'react-icons/fa6';
import type { TAdminListParams, TFilterField } from '@/types/common.types';

type TFilterChipsProps = {
    fields: TFilterField[];
    params: TAdminListParams;
    /** Claves de la URL que se quitan al pulsar el chip. */
    onRemove: (keys: string[]) => void;
};

const CHIP =
    'group inline-flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 pr-1.5 pl-2.5 text-xs lg:text-sm font-semibold transition-all duration-200';

const dateLabel = (from?: string, to?: string) => {
    if (from && to) return `${from} → ${to}`;
    return from ? `Desde ${from}` : `Hasta ${to}`;
};

/** Filtros activos como pildoras removibles, con "Limpiar todos" al final. */
export const FilterChips = ({ fields, params, onRemove }: TFilterChipsProps) => {
    const chips = fields.flatMap((field) => {
        if (field.type === 'dates') {
            return params.from || params.to
                ? [{ keys: ['from', 'to'], label: dateLabel(params.from, params.to) }]
                : [];
        }

        const value = params[field.name];
        if (!value) return [];

        const option = field.options.find((o) => o.value === value);
        return [{ keys: [field.name], label: option?.label ?? value }];
    });

    if (chips.length === 0) return null;

    return (
        <div className="mb-5 flex flex-wrap items-center gap-1.5">
            <span className="mr-0.5 text-xs lg:text-sm text-fourth-admin/75">Filtros activos:</span>

            {chips.map((chip) => (
                <button
                    key={chip.keys.join()}
                    type="button"
                    onClick={() => onRemove(chip.keys)}
                    aria-label={`Quitar filtro ${chip.label}`}
                    className={`${CHIP} bg-secondary-admin/10 text-secondary-admin hover:bg-secondary-admin/18`}
                >
                    {chip.label}
                    <span className="bg-secondary-admin/20 group-hover:bg-secondary-admin group-hover:text-primary-admin inline-flex size-4.5 items-center justify-center rounded-full">
                        <FaXmark aria-hidden="true" className="size-4 lg:size-4.5" />
                    </span>
                </button>
            ))}

            <button
                type="button"
                onClick={() => onRemove(chips.flatMap((chip) => chip.keys))}
                className={`${CHIP} px-2.5 text-fourth-admin/75 hover:bg-red-700/6 hover:text-red-700`}
            >
                Limpiar todos
            </button>
        </div>
    );
};
