import type { TAdminListParams, TFilterField } from '@/types/common.types';

/** Claves de filtro activas; el rango de fechas cuenta como uno solo. */
export const activeFilterKeys = (filters: TFilterField[], params: TAdminListParams) => {
  const keys = filters.filter((f) => f.type === 'select' && params[f.name]).map((f) => (f.type === 'select' ? f.name : ''));
  if (params.from || params.to) keys.push('dates');
  return keys;
};

/** Hay busqueda o algun filtro: el estado vacio dice "sin resultados", no "crea el primero". */
export const isFilteredList = (filters: TFilterField[], params: TAdminListParams) =>
  Boolean(params.search) || activeFilterKeys(filters, params).length > 0;
