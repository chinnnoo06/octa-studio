import type { Metadata } from 'next';
import { CreateProjectForm } from '@/components/projects/form/CreateProjectForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';

export const metadata: Metadata = { title: 'Crear proyecto' };

export default function CrearProyectoPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Agrega un nuevo proyecto</Eyebrow>
          <SectionTitle lead="Crear" rotating="Proyecto" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <CreateProjectForm />

    </section>
  );
}
