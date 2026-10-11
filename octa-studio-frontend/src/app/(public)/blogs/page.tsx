import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';
import { BLOG_CATEGORIES } from '@/utils/data/blogs';
import { slugify } from '@/utils/slugify';
import { getBlogsService } from '@/services/server/blog.service';

export const metadata: Metadata = {
  title: 'Blog de stands, ferias y eventos',
  description: 'Consejos para planear tu stand: presupuestos, renders, tiempos de recinto, logística de feria y montaje en expos de México y Estados Unidos.',
  alternates: { canonical: '/blogs' },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: '/blogs',
    title: 'Blog de stands, ferias y eventos | Octa Building Studio',
    description: 'Consejos para planear tu stand: presupuestos, renders, tiempos de recinto, logística de feria y montaje en expos de México y Estados Unidos.',
  },
  twitter: {
    ...SHARED_TWITTER,
    title: 'Blog de stands, ferias y eventos | Octa Building Studio',
    description: 'Consejos para planear tu stand: presupuestos, renders, tiempos de recinto, logística de feria y montaje en expos de México y Estados Unidos.',
  },
};

export default async function BlogsPage({ searchParams }: { searchParams: Promise<{ page?: string; categoria?: string }> }) {
  const { page, categoria } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const category = BLOG_CATEGORIES.find((c) => slugify(c) === categoria);

  const { blogs, pagination } = await getBlogsService(current, category);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(category ? `/blogs?categoria=${slugify(category)}#entradas` : '/blogs#entradas');
  }

  return (
    <>
      <Hero />
      <Posts blogs={blogs} pagination={pagination} category={category} />
    </>
  );
}
