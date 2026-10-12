import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';
import { getBlogsService } from '@/services/server/blog.service';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';
import { blogCategoryPath } from '@/utils/blogBreadcrumb';

type TBlogCategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const findCategory = async (slug: string) => {
  const categories = await getBlogCategoriesService();
  return { categories, category: categories.find((c) => c.slug === slug) };
};

/** El SEO de la categoria; si se dejo vacio, su nombre y su descripcion. */
export async function generateMetadata({ params }: TBlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await findCategory(slug);

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
    alternates: { canonical: url },
    openGraph: { ...SHARED_OPEN_GRAPH, url, title: `${title} | Octa Building Studio`, description },
    twitter: { ...SHARED_TWITTER, title: `${title} | Octa Building Studio`, description },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: TBlogCategoryPageProps) {
  const [{ slug }, { page }] = await Promise.all([params, searchParams]);

  const { categories, category } = await findCategory(slug);

  if (!category) notFound();

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { blogs, pagination } = await getBlogsService(current, category.slug);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(`${blogCategoryPath(category.slug)}#entradas`);
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
