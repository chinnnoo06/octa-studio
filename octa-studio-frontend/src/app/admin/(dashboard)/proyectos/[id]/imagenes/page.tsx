import type { Metadata } from 'next';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditProjectImages } from '@/components/projects/images/EditProjectImages';
import { getProjectByIdService } from '@/services/server/projects.service';

export const metadata: Metadata = { title: 'Imágenes del proyecto' };

export default async function ImagenesProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await getProjectByIdService(id);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Actualiza las imágenes</Eyebrow>
          <SectionTitle lead="Imágenes del" rotating="Proyecto" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <EditProjectImages project={project} />
    </section>
  );
}
