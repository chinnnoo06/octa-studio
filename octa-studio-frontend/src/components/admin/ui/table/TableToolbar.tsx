'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass, FaPlus, FaSliders, FaXmark } from 'react-icons/fa6';
import type { TAdminListParams, TFilterField } from '@/types/common.types';
import { activeFilterKeys } from '@/utils/admin/tableFilters';
import { toQueryString } from '@/utils/admin/queryString';
import { PanelButton } from '@/components/admin/ui/buttons/PanelButton';
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
            <div className="mb-5 flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center">
                <div className="bg-primary-admin focus-within:border-secondary-admin relative flex w-full items-center rounded-xl border border-fourth-admin/30 transition-all duration-200 focus-within:shadow-lg md:min-w-60 md:flex-1">
                    <FaMagnifyingGlass aria-hidden="true" className="ml-2.5 size-4 lg:size-4.5 shrink-0 text-fourth-admin/75" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        aria-label="Buscar"
                        autoComplete="off"
                        className="text-fourth-admin min-w-0 flex-1 bg-transparent px-2.5 py-2.5 text-sm lg:text-base outline-none placeholder:text-fourth-admin/75"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            aria-label="Limpiar búsqueda"
                            className="hover:text-fourth-admin flex cursor-pointer items-center px-2.5 py-1.5 text-fourth-admin/75"
                        >
                            <FaXmark aria-hidden="true" className="size-4 lg:size-4.5" />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="admin-filters"
                    className={`group inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border hover:shadow-lg px-5 py-2.5 text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeCount > 0
                        ? 'border-secondary-admin bg-secondary-admin/8 text-secondary-admin'
                        : 'bg-primary-admin text-fourth-admin hover:border-secondary-admin hover:text-secondary-admin border-fourth-admin/30'
                        }`}
                >
                    <FaSliders aria-hidden="true" className={`size-4 lg:size-4.5 ${activeCount > 0 ? '' : 'group-hover:text-secondary-admin text-fourth-admin/75'}`} />
                    Filtros
                    {activeCount > 0 && (
                        <span className="bg-secondary-admin text-primary-admin ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold">
                            {activeCount}
                        </span>
                    )}
                </button>

                <PanelButton href={addHref} className="md:ml-auto">
                    <FaPlus aria-hidden="true" className="size-4 lg:size-4.5" />
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
