import type { MetadataRoute } from 'next';
import { SITE } from '@/utils/data/site';
import { getBlogsService } from '@/services/server/blog.service';
import { getProjectsService } from '@/services/server/project.service';
import { blogCategoryPath } from '@/utils/blogBreadcrumb';

export const revalidate = 3600;

/**
 * Google ignora un `lastmod` que siempre es "ahora", asi que solo se pone cuando
 * hay una fecha real: el inicio y /proyectos toman la del ultimo proyecto
 * editado; las paginas de copy fijo no lo llevan.
 */
const staticRoutes = (latestProject?: Date): MetadataRoute.Sitemap => [
  { url: SITE.url,                    lastModified: latestProject, changeFrequency: 'monthly', priority: 1   },
  { url: `${SITE.url}/servicios`,     changeFrequency: 'monthly', priority: 0.9 },
  { url: `${SITE.url}/proyectos`,     lastModified: latestProject, changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${SITE.url}/nosotros`,      changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE.url}/blogs`,         changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${SITE.url}/contacto`,      changeFrequency: 'yearly',  priority: 0.7 },
  { url: `${SITE.url}/privacidad`,    changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${SITE.url}/creditos`,      changeFrequency: 'yearly',  priority: 0.3 },
];

const projectDate = (project: { updatedAt?: string; createdAt?: string }) => {
  const value = project.updatedAt ?? project.createdAt;
  return value ? new Date(value) : undefined;
};

const collectProjects = async () => {
  const projects = [];
  try {
    const first = await getProjectsService();
    projects.push(...first.projects);
    for (let page = 2; page <= first.pagination.totalPages; page++) {
      const next = await getProjectsService(page);
      projects.push(...next.projects);
    }
  } catch { /* API caída: no bloquea el sitemap */ }
  return projects;
};

const collectBlogs = async () => {
  const blogs = [];
  try {
    const first = await getBlogsService();
    blogs.push(...first.blogs);
    for (let page = 2; page <= first.pagination.totalPages; page++) {
      const next = await getBlogsService(page);
      blogs.push(...next.blogs);
    }
  } catch { /* API caída: no bloquea el sitemap */ }
  return blogs;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogs] = await Promise.all([collectProjects(), collectBlogs()]);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE.url}/proyectos/${p.slug}`,
    lastModified: projectDate(p),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const latestProject = projects
    .map(projectDate)
    .filter((date): date is Date => date !== undefined)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${SITE.url}/blogs/${b.slug}`,
    lastModified: new Date(b.updatedAt ?? b.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Solo las categorias con entradas: una vacia no aporta nada al buscador.
  const latestByCategory = new Map<string, Date>();
  blogs.forEach((b) => {
    if (!b.category) return;
    const date = new Date(b.updatedAt ?? b.createdAt);
    const known = latestByCategory.get(b.category.slug);
    if (!known || date > known) latestByCategory.set(b.category.slug, date);
  });

  const categoryRoutes: MetadataRoute.Sitemap = [...latestByCategory].map(([slug, lastModified]) => ({
    url: `${SITE.url}${blogCategoryPath(slug)}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticRoutes(latestProject), ...projectRoutes, ...categoryRoutes, ...blogRoutes];
}
