import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogStructuredData } from '@/components/seo/BlogStructuredData';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { RelatedPosts } from '@/components/blogs/post/RelatedPosts';
import { CtaSection } from '@/components/sections/CtaSection';
import { getBlogBySlugService, getBlogsService } from '@/services/server/blog.service';
import type { TBlog } from '@/schemas/blog/blog.schemas';
import { Post } from '@/components/blogs/post/Post';
import { BlogViewTracker } from '@/components/blogs/post/BlogViewTracker';

const RELATED = 3;

const IMAGE_URL = process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL!;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlugService(slug);

  if (!blog) return { title: 'Entrada no encontrada' };

  const blogUrl = `/blogs/${slug}`;
  const image = { url: `${IMAGE_URL}/${blog.image}`, alt: blog.title };

  return {
    title: blog.seo.metaTitle,
    description: blog.seo.metaDescription,
    alternates: { canonical: blogUrl },
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      type: 'article',
      url: blogUrl,
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      publishedTime: blog.createdAt,
      section: blog.category?.name,
      images: [image],
    },
    twitter: {
      ...SHARED_TWITTER,
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      images: [image],
    },
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
    getBlogsService(1, blog.category?.slug),
    getBlogsService(1),
  ]);

  const related = pickRelated(blog, sameCategory, latest);

  return (
    <>
      <BlogStructuredData blog={blog} imageUrl={IMAGE_URL} />
      <BlogViewTracker slug={blog.slug} />
      <Post blog={blog} />
      <CtaSection line="Ya sabes cómo lo hacemos. Cuéntanos tu próxima feria." />
      <RelatedPosts blogs={related} />
    </>
  );
}
