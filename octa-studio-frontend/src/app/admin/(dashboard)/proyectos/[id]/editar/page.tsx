import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditProjectForm } from '@/components/projects/form/EditProjectForm';
import { getProjectByIdService } from '@/services/server/project.service';

export const metadata: Metadata = { title: 'Editar proyecto' };

export default async function EditarProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await getProjectByIdService(id);

  if (!project) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Editar proyecto" subtitle="Edita la información del proyecto y su SEO." actions={<><BackButton /><FormSubmitButton>Guardar cambios</FormSubmitButton></>} narrow />

      <EditProjectForm project={project} />
    </section>
  );
}
