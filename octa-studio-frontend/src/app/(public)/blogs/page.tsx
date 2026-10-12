import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';
import { getBlogsService } from '@/services/server/blog.service';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';

type TBlogsPageProps = { searchParams: Promise<{ page?: string; categoria?: string }> };

const TITLE = 'Blog de stands, ferias y eventos';
const DESCRIPTION = 'Consejos para planear tu stand: presupuestos, renders, tiempos de recinto, logística de feria y montaje en expos de México y Estados Unidos.';

/**
 * Con `?categoria=` la pagina usa el SEO de esa categoria (o su nombre y
 * descripcion si se dejo vacio); sin filtro, el del blog completo.
 */
export async function generateMetadata({ searchParams }: TBlogsPageProps): Promise<Metadata> {
  const { categoria } = await searchParams;
  const category = categoria ? (await getBlogCategoriesService()).find((c) => c.slug === categoria) : undefined;

  const title = category ? category.seo.metaTitle || `${category.name} | Blog` : TITLE;
  const description = category ? category.seo.metaDescription || category.description || DESCRIPTION : DESCRIPTION;
  const url = category ? `/blogs?categoria=${category.slug}` : '/blogs';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...SHARED_OPEN_GRAPH, url, title: `${title} | Octa Building Studio`, description },
    twitter: { ...SHARED_TWITTER, title: `${title} | Octa Building Studio`, description },
  };
}

export default async function BlogsPage({ searchParams }: TBlogsPageProps) {
  const { page, categoria } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const categories = await getBlogCategoriesService();
  const category = categories.find((c) => c.slug === categoria);

  const { blogs, pagination } = await getBlogsService(current, category?.slug);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(category ? `/blogs?categoria=${category.slug}#entradas` : '/blogs#entradas');
  }

  return (
    <>
      <Hero />
      <Posts blogs={blogs} pagination={pagination} categories={categories} category={category} />
    </>
  );
}
