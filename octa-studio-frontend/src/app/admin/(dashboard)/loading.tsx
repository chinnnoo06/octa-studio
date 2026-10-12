/**
 * Spinner del panel mientras carga cada pantalla. Va dentro del layout, asi
 * que header y sidebar se quedan fijos y solo el contenido muestra la carga.
 */
export default function AdminLoading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <div className="border-t-secondary-admin size-11 animate-spin rounded-full border-4 border-fourth-admin/30" />
      <span className="text-xs lg:text-sm text-fourth-admin/75">Cargando…</span>
    </div>
  );
}
