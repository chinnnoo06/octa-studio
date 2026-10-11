'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass, FaPlus, FaSliders, FaXmark } from 'react-icons/fa6';
import type { TAdminListParams, TFilterField } from '@/types/common.types';
import { activeFilterKeys } from '@/utils/tableFilters';
import { toQueryString } from '@/utils/queryString';
import { PanelButton } from '@/components/ui/buttons/PanelButton';
import { TableFilters } from './TableFilters';
import { FilterChips } from './FilterChips';

type TTableToolbarProps = {
    basePath: string;
    params: TAdminListParams;
    searchPlaceholder: string;
    filters: TFilterField[];
    addHref: string;
    addLabel: string;
};

const SEARCH_DELAY = 400;

/**
 * Barra superior de cada listado: buscador con espera, boton de filtros con
 * contador y el boton "Nuevo". Debajo, el panel de filtros y los chips activos.
 * Todo vive en la URL, asi el listado se puede recargar o compartir tal cual.
 */
export const TableToolbar = ({ basePath, params, searchPlaceholder, filters, addHref, addLabel }: TTableToolbarProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [search, setSearch] = useState(params.search ?? '');
    const [open, setOpen] = useState(false);
    const lastPushed = useRef(params.search ?? '');

    const navigate = (next: TAdminListParams) => {
        const query = toQueryString({ ...next, page: undefined });
        startTransition(() => router.replace(query ? `${basePath}?${query}` : basePath, { scroll: false }));
    };

    // El buscador espera a que se deje de escribir antes de tocar la URL.
    useEffect(() => {
        if (search === lastPushed.current) return;

        const timer = setTimeout(() => {
            lastPushed.current = search;
            navigate({ ...params, search: search.trim() || undefined });
        }, SEARCH_DELAY);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- solo reacciona a lo escrito
    }, [search]);

    const activeCount = activeFilterKeys(filters, params).length;

    return (
        <>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-2.5">
                <div className="bg-primary focus-within:border-secondary relative flex w-full items-center rounded-[8px] border border-slate-200 transition-all duration-200 focus-within:shadow-[0_0_0_3px_rgba(24,96,140,0.12)] md:min-w-60 md:flex-1">
                    <FaMagnifyingGlass aria-hidden="true" className="ml-3.5 size-3.75 shrink-0 text-gray-600" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        aria-label="Buscar"
                        autoComplete="off"
                        className="text-ink min-w-0 flex-1 bg-transparent px-3.5 py-2.75 text-[14px] outline-none placeholder:text-gray-600"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            aria-label="Limpiar búsqueda"
                            className="hover:text-ink flex cursor-pointer items-center px-3 py-1.5 text-gray-600"
                        >
                            <FaXmark aria-hidden="true" className="size-3.5" />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="admin-filters"
                    className={`group inline-flex cursor-pointer items-center justify-center gap-1.75 rounded-[8px] border px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${activeCount > 0
                        ? 'border-secondary bg-secondary/8 text-secondary'
                        : 'bg-primary text-ink hover:border-secondary hover:text-secondary border-slate-200'
                        }`}
                >
                    <FaSliders aria-hidden="true" className={`size-3.5 ${activeCount > 0 ? '' : 'group-hover:text-secondary text-gray-600'}`} />
                    Filtros
                    {activeCount > 0 && (
                        <span className="bg-secondary text-primary ml-0.75 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.25 text-[11px] font-semibold">
                            {activeCount}
                        </span>
                    )}
                </button>

                <PanelButton href={addHref} className="md:ml-auto">
                    <FaPlus aria-hidden="true" className="size-3.5" />
                    {addLabel}
                </PanelButton>
            </div>

            <TableFilters
                id="admin-filters"
                open={open}
                fields={filters}
                params={params}
                onApply={(values) => {
                    navigate({ ...params, ...values });
                    setOpen(false);
                }}
            />

            <FilterChips
                fields={filters}
                params={params}
                onRemove={(keys) => navigate({ ...params, ...Object.fromEntries(keys.map((k) => [k, undefined])) })}
            />
        </>
    );
};
