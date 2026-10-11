
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

/** Valores que guarda el backend. Un borrador solo se ve en el panel. */
export const BLOG_STATUSES = ['published', 'draft'] as const;

export const BLOG_STATUS_LABELS: Record<(typeof BLOG_STATUSES)[number], string> = {
  published: 'Publicado',
  draft: 'Borrador',
};
