import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectStructuredData } from '@/components/seo/ProjectStructuredData';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { ProjectHero } from '@/components/projects/detail/ProjectHero';
import { ProjectCarousel } from '@/components/projects/detail/ProjectCarousel';
import { RelatedProjects } from '@/components/projects/detail/RelatedProjects';
import { CtaSection } from '@/components/sections/CtaSection';
import { getProjectBySlugService, getProjectsService } from '@/services/server/project.service';

const RELATED = 2;

const IMAGE_URL = process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL!;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlugService(slug);

  if (!project) return { title: 'Proyecto no encontrado' };

  const projectUrl = `/proyectos/${slug}`;
  const image = project.images[0]
    ? { url: `${IMAGE_URL}/${project.images[0]}`, alt: `Proyecto ${project.name}, ${project.sector}` }
    : undefined;

  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    alternates: { canonical: projectUrl },
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      url: projectUrl,
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      ...(image && { images: [image] }),
    },
    twitter: {
      ...SHARED_TWITTER,
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      ...(image && { images: [image] }),
    },
  };
}

export default async function ProjectPage({ params }: {params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlugService(slug);

  if (!project) notFound();

  // Los mas recientes que no sean este.
  const { projects } = await getProjectsService(1);
  const related = projects.filter((p) => p._id !== project._id).slice(0, RELATED);

  return (
    <>
      <ProjectStructuredData project={project} imageUrl={IMAGE_URL} />
      <ProjectHero project={project} />
      <ProjectCarousel project={project} />
      <CtaSection line="¿Un stand así para tu marca? Cuéntanos fecha, recinto y metros." />
      <RelatedProjects projects={related} />
    </>
  );
}
