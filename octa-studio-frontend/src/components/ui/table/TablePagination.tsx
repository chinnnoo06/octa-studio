import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import type { TPagination } from '@/schemas/common/common.response.schemas';
import type { TAdminListParams } from '@/types/common.types';
import { toQueryString } from '@/utils/queryString';

type TTablePaginationProps = {
    pagination: TPagination;
    basePath: string;
    /** Query actual: la paginacion conserva buscador, filtros y orden. */
    params: TAdminListParams;
};

const BTN =
    'inline-flex h-8.5 min-w-8.5 items-center justify-center gap-1.25 rounded-[6px] border px-2.5 text-[13px] font-semibold transition-all duration-150 select-none';

const IDLE = `${BTN} text-ink bg-primary border-slate-200 hover:border-secondary hover:bg-slate-50 hover:text-secondary`;

const DISABLED = `${BTN} cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300`;

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
        <div className="mt-5 flex flex-col items-center gap-2">
            {totalPages > 1 && (
                <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-1">
                    {hasPrevPage ? (
                        <Link href={href(page - 1)} className={`${IDLE} px-3.5`}>
                            <FaChevronLeft aria-hidden="true" className="size-2.75" />
                            <span className="hidden sm:inline">Anterior</span>
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={`${DISABLED} px-3.5`}>
                            <FaChevronLeft aria-hidden="true" className="size-2.75" />
                            <span className="hidden sm:inline">Anterior</span>
                        </span>
                    )}

                    <div className="flex items-center gap-0.75">
                        {pageWindow(page, totalPages).map((n, i) =>
                            n === '…' ? (
                                <span key={`gap-${i}`} className="inline-flex h-8.5 min-w-5 items-center justify-center text-[14px] font-semibold text-gray-600 select-none">
                                    …
                                </span>
                            ) : n === page ? (
                                <span
                                    key={n}
                                    aria-current="page"
                                    className={`${BTN} border-secondary bg-secondary text-primary cursor-default shadow-[0_2px_8px_rgba(24,96,140,0.25)]`}
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
                        <Link href={href(page + 1)} className={`${IDLE} px-3.5`}>
                            <span className="hidden sm:inline">Siguiente</span>
                            <FaChevronRight aria-hidden="true" className="size-2.75" />
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={`${DISABLED} px-3.5`}>
                            <span className="hidden sm:inline">Siguiente</span>
                            <FaChevronRight aria-hidden="true" className="size-2.75" />
                        </span>
                    )}
                </nav>
            )}

            <p className="text-[12px] text-gray-600">
                Mostrando <strong className="text-ink font-semibold">{from}-{to}</strong> de{' '}
                <strong className="text-ink font-semibold">{total}</strong>
            </p>
        </div>
    );
};
