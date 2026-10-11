import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { TPagination } from '@/schemas/common/common.response.schemas';

type TPaginationProps = {
    pagination: TPagination;
    basePath: string;
    anchor?: string;
};

const CONTROL =
    'inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm lg:text-base transition-colors duration-300';

export const Pagination = ({ pagination, basePath, anchor }: TPaginationProps) => {
    const { page, totalPages, total, hasNextPage, hasPrevPage } = pagination;
    const sep = basePath.includes('?') ? '&' : '?';
    const href = (n: number) => `${basePath}${sep}page=${n}${anchor ? `#${anchor}` : ''}`;

    return (
        <nav
            aria-label="Paginación"
            className="flex flex-wrap items-center justify-between gap-5"
        >
            <p className="text-fourth/75 text-sm lg:text-base">
                Página {page} de {totalPages} · {total} en total
            </p>

            <div className="flex items-center gap-2.5">
                {hasPrevPage ? (
                    <Link href={href(page - 1)} className={`${CONTROL} text-secondary hover:bg-secondary/15`}>
                        <FiChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                        Anterior
                    </Link>
                ) : (
                    <span aria-disabled="true" className={`${CONTROL} text-fourth/30`}>
                        <FiChevronLeft aria-hidden="true" className="size-4 lg:size-4.5" />
                        Anterior
                    </span>
                )}

                {hasNextPage ? (
                    <Link href={href(page + 1)} className={`${CONTROL} text-secondary hover:bg-secondary/15`}>
                        Siguiente
                        <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                    </Link>
                ) : (
                    <span aria-disabled="true" className={`${CONTROL} text-fourth/30`}>
                        Siguiente
                        <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5" />
                    </span>
                )}
            </div>
        </nav>
    );
};
