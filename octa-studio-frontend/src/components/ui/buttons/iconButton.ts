/** Botones de solo icono de las filas del panel: editar, eliminar, ver medios. */
export const ICON_BUTTON = {
  base: 'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[6px] transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
  icon: 'size-[15px]',
  edit: 'text-secondary hover:bg-secondary/12 hover:text-[#0f4566]',
  delete: 'text-red-700 hover:bg-red-700/8 hover:text-red-800',
  view: 'text-sky-600 hover:bg-sky-600/12 hover:text-sky-700',
} as const;
