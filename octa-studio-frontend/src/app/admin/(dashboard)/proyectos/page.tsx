import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export default function AdminProyectosPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h1 className="text-secondary text-2xl font-semibold uppercase lg:text-3xl">Proyectos</h1>
        <PrimaryButton href="/admin/proyectos/crear">Agregar proyecto</PrimaryButton>
      </div>

      {/* TODO: listado de proyectos */}
    </section>
  );
}
