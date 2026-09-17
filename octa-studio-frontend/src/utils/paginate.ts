import type { TPagination } from '@/schemas/common/common.response.schemas';

/**
 * Pagina una lista estatica y devuelve el mismo objeto de paginacion que manda
 * el backend, para que las listas publicas usen el mismo <Pagination /> que el
 * panel. Cuando esas listas vengan de la API, esto desaparece.
 */
export const paginate = <T,>(items: T[], page: number, limit: number) => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const current = Math.min(Math.max(Math.trunc(page) || 1, 1), totalPages);
  const start = (current - 1) * limit;

  const pagination: TPagination = {
    page: current,
    limit,
    total,
    totalPages,
    hasNextPage: current < totalPages,
    hasPrevPage: current > 1,
  };

  return { visible: items.slice(start, start + limit), pagination };
};
