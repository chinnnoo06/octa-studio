/** Fecha ISO del backend (`createdAt`) a "17 de septiembre de 2026". */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

/** Fecha ISO a "17/09/2026", la de las tablas del panel. */
export const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
