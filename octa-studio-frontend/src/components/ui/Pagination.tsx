import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { TPagination } from '@/schemas/common/common.response.schemas';

type TPaginationProps = {
    pagination: TPagination;
    basePath: string;
};

const CONTROL =
    'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm transition-colors duration-300';

export const Pagination = ({ pagination, basePath }: TPaginationProps) => {
    const { page, totalPages, total, hasNextPage, hasPrevPage } = pagination;

    return (
        <nav
            aria-label="Paginación"
            className="flex flex-wrap items-center justify-between gap-5"
        >
            <p className="text-fourth/75 text-xs lg:text-sm">
                Página {page} de {totalPages} · {total} en total
            </p>

            <div className="flex items-center gap-2.5">
                {hasPrevPage ? (
                    <Link href={`${basePath}?page=${page - 1}`} className={`${CONTROL} text-secondary hover:bg-secondary/15`}>
                        <FiChevronLeft aria-hidden="true" className="size-4" />
                        Anterior
                    </Link>
                ) : (
                    <span aria-disabled="true" className={`${CONTROL} text-fourth/30`}>
                        <FiChevronLeft aria-hidden="true" className="size-4" />
                        Anterior
                    </span>
                )}

                {hasNextPage ? (
                    <Link href={`${basePath}?page=${page + 1}`} className={`${CONTROL} text-secondary hover:bg-secondary/15`}>
                        Siguiente
                        <FiChevronRight aria-hidden="true" className="size-4" />
                    </Link>
                ) : (
                    <span aria-disabled="true" className={`${CONTROL} text-fourth/30`}>
                        Siguiente
                        <FiChevronRight aria-hidden="true" className="size-4" />
                    </span>
                )}
            </div>
        </nav>
    );
};
