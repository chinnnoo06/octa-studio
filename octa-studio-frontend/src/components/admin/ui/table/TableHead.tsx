import Link from 'next/link';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';
import type { TAdminListParams } from '@/types/common.types';
import { toQueryString } from '@/utils/admin/queryString';
import { BulkSelectAll } from './BulkSelection';

export type TTableColumn =
    | string
    | {
        label: string;
        sortKey?: string;
        align?: 'center' | 'right';
    };

type TTableHeadProps = {
    columns: readonly TTableColumn[];
    alignLast?: boolean;
    selectable?: boolean;
    sorting?: { basePath: string; params: TAdminListParams };
};

const TH = 'px-5 py-2.5 align-middle text-xs lg:text-sm font-semibold tracking-[0.4px] whitespace-nowrap text-fourth-admin/75 uppercase select-none';

const ALIGN = { center: 'text-center', right: 'text-right pr-5' } as const;

export const TableHead = ({ columns, alignLast = true, selectable = false, sorting }: TTableHeadProps) => {
    return (
        <thead className="border-b border-fourth-admin/30 bg-thrird-admin/50">
            <tr>
                {selectable && (
                    <th scope="col" className="w-10 pr-0 pl-5 text-center">
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
                            className={`${TH} ${alignClass} ${active ? 'text-fourth-admin' : ''}`}
                        >
                            <Link href={href} scroll={false} className="group hover:text-fourth-admin inline-flex items-center gap-1.5 transition-colors duration-150">
                                {label}
                                <span aria-hidden="true" className={`inline-flex flex-col leading-none transition-opacity duration-150 group-hover:opacity-100 ${active ? 'opacity-100' : 'opacity-60'}`}>
                                    <FaCaretUp className={`-mb-0.75 size-2.5 ${active && order === 'asc' ? 'text-secondary-admin' : 'text-fourth-admin/30 group-hover:text-fourth-admin'}`} />
                                    <FaCaretDown className={`size-2.5 ${active && order !== 'asc' ? 'text-secondary-admin' : 'text-fourth-admin/30 group-hover:text-fourth-admin'}`} />
                                </span>
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
