import type { Metadata } from 'next';
import { CreateProjectForm } from '@/components/projects/form/CreateProjectForm';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';

export const metadata: Metadata = { title: 'Crear proyecto' };

export default function CrearProyectoPage() {
  return (
    <section className="w-full">
      <AdminHeading title="Crear proyecto" subtitle="Registra un nuevo proyecto con sus imágenes, videos y SEO." actions={<><BackButton /><FormSubmitButton>Crear proyecto</FormSubmitButton></>} narrow />

      <CreateProjectForm />
    </section>
  );
}
