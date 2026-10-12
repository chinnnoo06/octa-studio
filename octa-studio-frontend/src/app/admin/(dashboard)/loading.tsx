/**
 * Spinner del panel mientras carga cada pantalla. Va dentro del layout, asi
 * que header y sidebar se quedan fijos y solo el contenido muestra la carga.
 */
export default function AdminLoading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] flex-col items-center justify-center gap-3.75">
      <div className="border-t-secondary size-11 animate-spin rounded-full border-4 border-[#d8dee4]" />
      <span className="text-[13px] text-gray-600">Cargando…</span>
    </div>
  );
}
