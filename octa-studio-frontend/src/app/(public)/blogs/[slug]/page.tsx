import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/utils/metadata';
import { PostHero } from '@/components/blogs/post/PostHero';
import { PostBody } from '@/components/blogs/post/PostBody';
import { RelatedPosts } from '@/components/blogs/post/RelatedPosts';
import { CtaSection } from '@/components/sections/CtaSection';
import { getBlogBySlugService, getBlogsService } from '@/services/server/blogs.service';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';

const RELATED = 3;

export async function generateMetadata({ params }:{ params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlugService(slug);

  if (!blog) {
    return { title: 'Entrada no encontrada' };
  }

  const base = pageMetadata({
    title: blog.seo.metaTitle,
    description: blog.seo.metaDescription,
    path: `/blogs/${blog.slug}`,
  });

  const image = { url: `${process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL}/${blog.image}`, alt: blog.title };

  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: blog.createdAt, images: [image] },
    twitter: { ...base.twitter, images: [image] },
  };
}

const pickRelated = (current: TBlog, sameCategory: TBlog[], latest: TBlog[]) => {
  const seen = new Set([current._id]);

  return [...sameCategory, ...latest]
    .filter((blog) => (seen.has(blog._id) ? false : seen.add(blog._id)))
    .slice(0, RELATED);
};

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlugService(slug);

  if (!blog) notFound();

  const [{ blogs: sameCategory }, { blogs: latest }] = await Promise.all([
    getBlogsService(1, blog.category),
    getBlogsService(1),
  ]);

  const related = pickRelated(blog, sameCategory, latest);

  return (
    <>
      <PostHero blog={blog} />
      <PostBody blog={blog} />
      <CtaSection line="Ya sabes cómo lo hacemos. Cuéntanos tu próxima feria." />
      <RelatedPosts blogs={related} />
    </>
  );
}
