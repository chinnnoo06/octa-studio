/** Fecha ISO del backend (`createdAt`) a "17 de septiembre de 2026". */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
