import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';
import { getBlogsService } from '@/services/server/blog.service';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';
import { blogCategoryPath } from '@/utils/blogBreadcrumb';
import { paginatedMetadata } from '@/utils/paginatedMetadata';

type TBlogCategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

/** El SEO de la categoria; si se dejo vacio, su nombre y su descripcion. */
export async function generateMetadata({ params, searchParams }: TBlogCategoryPageProps): Promise<Metadata> {
  const [{ slug }, { page }, categories] = await Promise.all([
    params,
    searchParams,
    getBlogCategoriesService(),
  ]);

  const category = categories.find((c) => c.slug === slug);

  if (!category) return { title: 'Categoría no encontrada' };

  const title = category.seo.metaTitle || `${category.name} | Blog`;
  const description =
    category.seo.metaDescription ||
    category.description ||
    `Entradas de ${category.name} en el blog de Octa Building Studio: stands, ferias y eventos en México y Estados Unidos.`;
  const url = blogCategoryPath(category.slug);

  return {
    title,
    description,
    ...paginatedMetadata(url, page),
    openGraph: { ...SHARED_OPEN_GRAPH, url, title: `${title} | Octa Building Studio`, description },
    twitter: { ...SHARED_TWITTER, title: `${title} | Octa Building Studio`, description },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: TBlogCategoryPageProps) {
  const [{ slug }, { page }, categories] = await Promise.all([
    params,
    searchParams,
    getBlogCategoriesService(),
  ]);

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const data = await getBlogsService(current, slug);

  if (data === null) redirect('/blogs');

  const category = categories.find((c) => c.slug === slug)!;

  const { blogs, pagination } = data;

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(`${blogCategoryPath(category.slug)}#blogs-entradas`);
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Blog', path: '/blogs' },
          { name: category.name, path: blogCategoryPath(category.slug) },
        ]}
      />
      <Hero category={category} />
      <Posts blogs={blogs} pagination={pagination} categories={categories} category={category} />
    </>
  );
}
