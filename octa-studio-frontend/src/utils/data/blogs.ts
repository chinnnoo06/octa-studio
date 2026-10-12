
/** Valores que guarda el backend. Un borrador solo se ve en el panel. */
export const BLOG_STATUSES = ['published', 'draft'] as const;

export const BLOG_STATUS_LABELS: Record<(typeof BLOG_STATUSES)[number], string> = {
  published: 'Publicado',
  draft: 'Borrador',
};

/** Orden del selector "Estado" del formulario: borrador primero, como en el panel de referencia. */
export const BLOG_STATUS_OPTIONS = ['draft', 'published'] as const;
