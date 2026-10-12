import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import type { TPagination } from '@/schemas/common/common.response.schemas';
import type { TAdminListParams } from '@/types/common.types';
import { toQueryString } from '@/utils/admin/queryString';

type TTablePaginationProps = {
    pagination: TPagination;
    basePath: string;
    /** Query actual: la paginacion conserva buscador, filtros y orden. */
    params: TAdminListParams;
};

const BTN =
    'inline-flex h-8.5 min-w-8.5 items-center justify-center gap-1.5 rounded-xl border hover:shadow-lg px-2.5 text-xs lg:text-sm font-semibold transition-all duration-150 select-none';

const IDLE = `${BTN} text-fourth-admin bg-primary-admin border-fourth-admin/30 hover:border-secondary-admin hover:bg-thrird-admin/50 hover:text-secondary-admin`;

const DISABLED = `${BTN} cursor-not-allowed hover:shadow-none border-fourth-admin/30 bg-thrird-admin/50 text-fourth-admin/30`;

/** Paginas a mostrar: la primera, la ultima y dos vecinas de la actual, con "…" en los saltos. */
const pageWindow = (page: number, totalPages: number) => {
    const pages = new Set([1, totalPages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= totalPages));
    const sorted = [...pages].sort((a, b) => a - b);

    return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? (['…', n] as const) : ([n] as const)));
};

/** Paginacion numerada del panel con el resumen "Mostrando 1-10 de 50". */
export const TablePagination = ({ pagination, basePath, params }: TTablePaginationProps) => {
    const { page, totalPages, total, limit, hasNextPage, hasPrevPage } = pagination;

    if (total === 0) return null;

    const href = (n: number) => {
        const query = toQueryString({ ...params, page: n > 1 ? String(n) : undefined });
        return query ? `${basePath}?${query}` : basePath;
    };

    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    return (
        <div className="mt-5 flex flex-col items-center gap-2.5">
            {totalPages > 1 && (
                <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-1.5">
                    {hasPrevPage ? (
                        <Link href={href(page - 1)} className={`${IDLE} px-2.5`}>
                            <FaChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                            <span className="hidden sm:inline">Anterior</span>
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={`${DISABLED} px-2.5`}>
                            <FaChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                            <span className="hidden sm:inline">Anterior</span>
                        </span>
                    )}

                    <div className="flex items-center gap-0.5">
                        {pageWindow(page, totalPages).map((n, i) =>
                            n === '…' ? (
                                <span key={`gap-${i}`} className="inline-flex h-8.5 min-w-5 items-center justify-center text-sm lg:text-base font-semibold text-fourth-admin/75 select-none">
                                    …
                                </span>
                            ) : n === page ? (
                                <span
                                    key={n}
                                    aria-current="page"
                                    className={`${BTN} border-secondary-admin bg-secondary-admin text-primary-admin cursor-default`}
                                >
                                    {n}
                                </span>
                            ) : (
                                <Link key={n} href={href(n)} className={IDLE}>
                                    {n}
                                </Link>
                            ),
                        )}
                    </div>

                    {hasNextPage ? (
                        <Link href={href(page + 1)} className={`${IDLE} px-2.5`}>
                            <span className="hidden sm:inline">Siguiente</span>
                            <FaChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={`${DISABLED} px-2.5`}>
                            <span className="hidden sm:inline">Siguiente</span>
                            <FaChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                        </span>
                    )}
                </nav>
            )}

            <p className="text-xs lg:text-sm text-fourth-admin/75">
                Mostrando <strong className="text-fourth-admin font-semibold">{from}-{to}</strong> de{' '}
                <strong className="text-fourth-admin font-semibold">{total}</strong>
            </p>
        </div>
    );
};
