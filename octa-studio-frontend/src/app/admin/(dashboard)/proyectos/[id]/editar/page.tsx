import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/admin/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/admin/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/admin/layout/AdminHeading';
import { EditProjectForm } from '@/components/admin/dashboard/projects/form/EditProjectForm';
import { getProjectByIdService } from '@/services/server/project.service';

export const metadata: Metadata = { title: 'Editar Proyecto' };

export default async function EditarProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await getProjectByIdService(id);

  if (!project) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Editar Proyecto" subtitle="Edita la información, las imágenes, los videos y el SEO del proyecto." actions={<><BackButton /><FormSubmitButton>Guardar cambios</FormSubmitButton></>} narrow />

      <EditProjectForm project={project} />
    </section>
  );
}
