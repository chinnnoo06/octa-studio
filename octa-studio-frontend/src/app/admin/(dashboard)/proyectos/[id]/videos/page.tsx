import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditProjectVideosForm } from '@/components/projects/form/videos/EditProjectVideosForm';
import { getProjectByIdService } from '@/services/server/project.service';

export const metadata: Metadata = { title: 'Videos del proyecto' };

export default async function VideosProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await getProjectByIdService(id);

  if (!project) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Videos del proyecto" subtitle="Reemplaza o quita los videos del proyecto." actions={<><BackButton /><FormSubmitButton>Reemplazar videos</FormSubmitButton></>} narrow />

      <EditProjectVideosForm project={project} />
    </section>
  );
}
