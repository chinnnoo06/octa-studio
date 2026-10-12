import type { TBlog } from '@/schemas/blog/blog.schemas';
import { SITE } from '@/utils/data/site';
import { blogBreadcrumb } from '@/utils/blogBreadcrumb';
import { breadcrumbList } from './BreadcrumbStructuredData';

type TBlogStructuredDataProps = {
  blog: TBlog;
  imageUrl: string;
};

export const BlogStructuredData = ({ blog, imageUrl }: TBlogStructuredDataProps) => {
  const blogUrl = `${SITE.url}/blogs/${blog.slug}`;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${blogUrl}/#articulo`,
    headline: blog.title,
    description: blog.seo.metaDescription,
    url: blogUrl,
    mainEntityOfPage: blogUrl,
    image: `${imageUrl}/${blog.image}`,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt ?? blog.createdAt,
    articleSection: blog.category?.name,
    inLanguage: 'es-MX',
    timeRequired: `PT${blog.readingTime}M`,
    author: { '@id': `${SITE.url}/#negocio` },
    publisher: { '@id': `${SITE.url}/#negocio` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([blogPosting, breadcrumbList(blogBreadcrumb(blog))]) }}
    />
  );
};
