import type { TProject } from '@/schemas/project/project.schemas';
import { SITE } from '@/utils/data/site';

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

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${SITE.url}/proyectos` },
      { '@type': 'ListItem', position: 3, name: project.name, item: projectUrl },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([creativeWork, breadcrumb]) }}
    />
  );
};
