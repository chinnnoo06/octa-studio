import Link from 'next/link';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';
import type { TAdminListParams } from '@/types/common.types';
import { toQueryString } from '@/utils/queryString';
import { BulkSelectAll } from './BulkSelection';

export type TTableColumn =
    | string
    | {
        label: string;
        /** Campo por el que ordena el backend; sin el, la columna no es ordenable. */
        sortKey?: string;
        align?: 'center' | 'right';
    };

type TTableHeadProps = {
    columns: readonly TTableColumn[];
    alignLast?: boolean;
    /** Primera columna con el checkbox de "seleccionar todos". */
    selectable?: boolean;
    /** URL y query actuales: con ellas cada cabecera ordenable arma su enlace. */
    sorting?: { basePath: string; params: TAdminListParams };
};

const TH = 'px-3.75 py-3.25 align-middle text-[12px] font-semibold tracking-[0.4px] whitespace-nowrap text-gray-600 uppercase select-none';

const ALIGN = { center: 'text-center', right: 'text-right pr-5' } as const;

export const TableHead = ({ columns, alignLast = true, selectable = false, sorting }: TTableHeadProps) => {
    return (
        <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
                {selectable && (
                    <th scope="col" className="w-10 pr-0 pl-4 text-center">
                        <BulkSelectAll />
                    </th>
                )}

                {columns.map((column, i) => {
                    const { label, sortKey, align } = typeof column === 'string' ? { label: column } : column;
                    const last = alignLast && i === columns.length - 1;
                    const alignClass = align ? ALIGN[align] : last ? ALIGN.right : '';

                    if (!sortKey || !sorting) {
                        return (
                            <th key={label} scope="col" className={`${TH} ${alignClass} ${last ? 'w-px' : ''}`}>
                                {label}
                            </th>
                        );
                    }

                    const active = sorting.params.sort === sortKey;
                    const order = active ? sorting.params.order : undefined;
                    // Primer clic: ascendente; sobre la columna activa, alterna.
                    const nextOrder = active && order === 'asc' ? 'desc' : 'asc';
                    const href = `${sorting.basePath}?${toQueryString({ ...sorting.params, sort: sortKey, order: nextOrder, page: undefined })}`;

                    return (
                        <th
                            key={label}
                            scope="col"
                            aria-sort={active ? (order === 'asc' ? 'ascending' : 'descending') : undefined}
                            className={`${TH} ${alignClass} ${active ? 'text-ink' : ''}`}
                        >
                            <Link href={href} scroll={false} className="group hover:text-ink inline-flex items-center gap-1.25 transition-colors duration-150">
                                {label}
                                <span aria-hidden="true" className={`inline-flex flex-col leading-none transition-opacity duration-150 group-hover:opacity-100 ${active ? 'opacity-100' : 'opacity-60'}`}>
                                    <FaCaretUp className={`-mb-0.75 size-2.5 ${active && order === 'asc' ? 'text-secondary' : 'text-slate-300 group-hover:text-ink'}`} />
                                    <FaCaretDown className={`size-2.5 ${active && order !== 'asc' ? 'text-secondary' : 'text-slate-300 group-hover:text-ink'}`} />
                                </span>
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
