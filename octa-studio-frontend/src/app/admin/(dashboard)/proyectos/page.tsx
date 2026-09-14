import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function AdminProyectosPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Administra los proyectos</Eyebrow>
          <SectionTitle lead="Nuestros" rotating="Proyectos" as='h1'/>
        </div>
    
        <PrimaryButton href="/admin/proyectos/crear">Agregar proyecto</PrimaryButton>
      </div>

      {/* TODO: listado de proyectos */}
    </section>
  );
}
