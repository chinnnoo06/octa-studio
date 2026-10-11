import type { TAdminListParams } from '@/types/common.types';

/** Solo los parametros con valor: `?search=` vacio no viaja al backend ni a la URL. */
export const toQueryString = (params: TAdminListParams) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, value);
  });

  return query.toString();
};

/** Lee los parametros conocidos de `searchParams` (descarta arrays y claves ajenas). */
export const pickParams = (raw: Record<string, string | string[] | undefined>, keys: readonly string[]) =>
  Object.fromEntries(
    keys.map((key) => {
      const value = raw[key];
      return [key, typeof value === 'string' ? value : undefined];
    }),
  ) as TAdminListParams;
