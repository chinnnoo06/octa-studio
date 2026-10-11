import type { MetadataRoute } from 'next';
import { SITE } from '@/utils/data/site';
import { getBlogsService } from '@/services/server/blog.service';
import { getProjectsService } from '@/services/server/project.service';

export const revalidate = 3600;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE.url,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 1   },
  { url: `${SITE.url}/servicios`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${SITE.url}/proyectos`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${SITE.url}/nosotros`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE.url}/blogs`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${SITE.url}/contacto`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  { url: `${SITE.url}/privacidad`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${SITE.url}/creditos`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
];

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
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${SITE.url}/blogs/${b.slug}`,
    lastModified: new Date(b.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...STATIC_ROUTES, ...projectRoutes, ...blogRoutes];
}
