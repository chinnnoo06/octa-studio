import type { Metadata } from 'next';
import { CreateProjectForm } from '@/components/admin/dashboard/projects/form/CreateProjectForm';
import { BackButton } from '@/components/admin/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/admin/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/admin/layout/AdminHeading';

export const metadata: Metadata = { title: 'Crear Proyecto' };

export default function CrearProyectoPage() {
  return (
    <section className="w-full">
      <AdminHeading title="Crear Proyecto" subtitle="Registra un nuevo proyecto con sus imágenes, videos y SEO." actions={<><BackButton /><FormSubmitButton>Crear proyecto</FormSubmitButton></>} narrow />

      <CreateProjectForm />
    </section>
  );
}
