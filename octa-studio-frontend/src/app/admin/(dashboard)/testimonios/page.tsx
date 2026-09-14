import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export default function AdminTestimoniosPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h1 className="text-secondary text-2xl font-semibold uppercase lg:text-3xl">Testimonios</h1>
        <PrimaryButton href="/admin/testimonios/crear">Agregar testimonio</PrimaryButton>
      </div>

      {/* TODO: listado de testimonios. Necesita modelo y rutas en el backend:
          hoy solo existen Blog, Project y User. */}
    </section>
  );
}
