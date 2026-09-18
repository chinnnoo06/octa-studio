/**
 * Las categorias del blog, en el mismo orden y con los mismos textos que el
 * enum `BlogCategory` del backend. De aqui salen el <select> del panel y la
 * validacion de los schemas: un blog con otra categoria no pasa.
 */
export const BLOG_CATEGORIES = [
  'Diseño de Stands',
  'Montaje y Logística',
  'Materiales y Sustentabilidad',
  'Casos de Éxito / Proyectos',
  'Guías para Expositores',
  'Ferias y Eventos',
  'Tendencias en Exhibición Comercial',
  'Noticias Octa',
] as const;
/** Copy del bloque de suscripción que cierra la sección. */
export const BLOG_NEWSLETTER = {
  title: 'No te pierdas ninguno',
  description:
    'Escribimos sobre ferias, montaje y producción cada pocas semanas. Sin spam y te puedes dar de baja cuando quieras.',
} as const;

