import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/utils/metadata';
import { ProjectHero } from '@/components/projects/detail/ProjectHero';
import { ProjectCarousel } from '@/components/projects/detail/ProjectCarousel';
import { RelatedProjects } from '@/components/projects/detail/RelatedProjects';
import { CtaSection } from '@/components/sections/CtaSection';
import { getProjectBySlugService, getProjectsService } from '@/services/server/projects.service';

type TProjectPageProps = { params: Promise<{ slug: string }> };

const RELATED = 2;

export async function generateMetadata({ params }: TProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlugService(slug);

  if (!project) {
    return { title: 'Proyecto no encontrado' };
  }

  const base = pageMetadata({
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    path: `/proyectos/${project.slug}`,
  });

  const image = {
    url: `${process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL}/${project.images[0]}`,
    alt: `Proyecto ${project.name}, ${project.sector}`,
  };

  return {
    ...base,
    openGraph: { ...base.openGraph, images: [image] },
    twitter: { ...base.twitter, images: [image] },
  };
}

export default async function ProjectPage({ params }: TProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugService(slug);

  if (!project) notFound();

  // Los mas recientes que no sean este.
  const { projects } = await getProjectsService(1);
  const related = projects.filter((p) => p._id !== project._id).slice(0, RELATED);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectCarousel project={project} />
      <CtaSection line="¿Un stand así para tu marca? Cuéntanos fecha, recinto y metros." />
      <RelatedProjects projects={related} />
    </>
  );
}
