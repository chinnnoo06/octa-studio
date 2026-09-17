/**
 * Texto a slug de URL: sin acentos, en minusculas y con guiones.
 * 'Casos de Éxito / Proyectos' -> 'casos-de-exito-proyectos'.
 */
export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
