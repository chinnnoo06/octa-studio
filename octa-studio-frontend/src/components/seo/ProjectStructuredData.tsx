import type { TProject } from '@/schemas/project/project.schemas';
import { SITE } from '@/utils/data/site';
import { breadcrumbList } from './BreadcrumbStructuredData';

type TProjectStructuredDataProps = {
  project: TProject;
  imageUrl: string;
};

export const ProjectStructuredData = ({ project, imageUrl }: TProjectStructuredDataProps) => {
  const projectUrl = `${SITE.url}/proyectos/${project.slug}`;

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${projectUrl}/#proyecto`,
    name: project.seo.metaTitle,
    description: project.seo.metaDescription,
    url: projectUrl,
    genre: project.sector,
    ...(project.images.length > 0 && { image: project.images.map((img) => `${imageUrl}/${img}`) }),
    creator: { '@id': `${SITE.url}/#negocio` },
  };

  const breadcrumb = breadcrumbList([
    { name: 'Proyectos', path: '/proyectos' },
    { name: project.name, path: `/proyectos/${project.slug}` },
  ]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([creativeWork, breadcrumb]) }}
    />
  );
};
