import { redirect } from 'next/navigation';
import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';
import { BLOG_CATEGORIES } from '@/utils/data/blogs';
import { slugify } from '@/utils/slugify';
import { getBlogsService } from '@/services/server/blogs.service';

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Lo que aprendimos montando stands: presupuestos, renders, tiempos de recinto y logística de feria.',
  path: '/blogs',
});

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; categoria?: string }>;
}) {
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
