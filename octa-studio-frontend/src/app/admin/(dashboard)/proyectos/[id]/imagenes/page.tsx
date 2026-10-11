import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditProjectImagesForm } from '@/components/projects/form/images/EditProjectImagesForm';
import { getProjectByIdService } from '@/services/server/project.service';

export const metadata: Metadata = { title: 'Imágenes del proyecto' };

export default async function ImagenesProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await getProjectByIdService(id);

  if (!project) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Imágenes del proyecto" subtitle="Reemplaza la galería de imágenes del proyecto." actions={<><BackButton /><FormSubmitButton>Reemplazar imágenes</FormSubmitButton></>} narrow />

      <EditProjectImagesForm project={project} />
    </section>
  );
}
