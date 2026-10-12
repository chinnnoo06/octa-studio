/** Botones de solo icono de las filas del panel: editar, eliminar, ver medios. */
export const ICON_BUTTON = {
  base: 'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
  icon: 'size-4 lg:size-4.5',
  edit: 'text-secondary-admin hover:bg-secondary-admin/12',
  delete: 'text-red-700 hover:bg-red-700/8 hover:text-red-800',
  view: 'text-fourth-admin/75 hover:bg-fourth-admin/10 hover:text-fourth-admin',
} as const;
