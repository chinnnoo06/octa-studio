import { permanentRedirect, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';
import { getBlogsService } from '@/services/server/blog.service';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';
import { blogCategoryPath } from '@/utils/blogBreadcrumb';

type TBlogsPageProps = { searchParams: Promise<{ page?: string; categoria?: string }> };

const TITLE = 'Blog de stands, ferias y eventos';
const DESCRIPTION = 'Consejos para planear tu stand: presupuestos, renders, tiempos de recinto, logística de feria y montaje en expos de México y Estados Unidos.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blogs' },
  openGraph: { ...SHARED_OPEN_GRAPH, url: '/blogs', title: `${TITLE} | Octa Building Studio`, description: DESCRIPTION },
  twitter: { ...SHARED_TWITTER, title: `${TITLE} | Octa Building Studio`, description: DESCRIPTION },
};

export default async function BlogsPage({ searchParams }: TBlogsPageProps) {
  const { page, categoria } = await searchParams;

  // Las categorias tienen su propia pagina; los enlaces viejos `?categoria=` se mueven alli (308).
  if (categoria) {
    permanentRedirect(`${blogCategoryPath(encodeURIComponent(categoria))}${page ? `?page=${page}` : ''}`);
  }

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const [categories, { blogs, pagination }] = await Promise.all([getBlogCategoriesService(), getBlogsService(current)]);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect('/blogs#entradas');
  }

  return (
    <>
      <Hero />
      <Posts blogs={blogs} pagination={pagination} categories={categories} />
    </>
  );
}
