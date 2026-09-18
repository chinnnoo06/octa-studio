import type { Metadata } from 'next';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditProjectForm } from '@/components/projects/form/EditProjectForm';
import { getProjectByIdService } from '@/services/server/projects.service';

export const metadata: Metadata = { title: 'Editar proyecto' };

export default async function EditarProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await getProjectByIdService(id);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Edita el proyecto</Eyebrow>
          <SectionTitle lead="Editar" rotating="Proyecto" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <EditProjectForm project={project} />
    </section>
  );
}
