import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal, RevealOnLoad } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import { formatDate } from '@/utils/formatDate';
import { blogBreadcrumb, blogCategoryPath } from '@/utils/blogBreadcrumb';
import type { TBlog } from '@/schemas/blog/blog.schemas';

export const PostHero = ({ blog }: { blog: TBlog }) => {
  return (
    <div className="flex flex-col gap-10">
      <RevealOnLoad variants={fadeBlur} className="w-full flex flex-col gap-5">
        <Breadcrumb items={blogBreadcrumb(blog)} />

        <div className="text-secondary flex flex-col items-start gap-2.5">
          {blog.category ? (
            <Link
              href={`${blogCategoryPath(blog.category.slug)}#entradas`}
              className="hover:text-secondary/75 transition-colors duration-300"
            >
              <Eyebrow>{blog.category.name}</Eyebrow>
            </Link>
          ) : (
            <Eyebrow>Blog</Eyebrow>
          )}

          <h1 className="text-[1.8rem] small:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold uppercase leading-[1.2] tracking-[-0.02em]">
            {blog.title}
          </h1>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-fourth/75 flex items-center gap-2.5 text-xs uppercase lg:text-sm">
            {formatDate(blog.createdAt)}
            <span aria-hidden="true" className="bg-fourth/30 size-1 rounded-full" />
            <span className="flex items-center gap-1.5">
              <FaRegClock aria-hidden="true" className="size-4 lg:size-4.5" />
              {blog.readingTime} min de lectura
            </span>
          </p>

          <p className="text-fourth/75 max-w-6xl text-base lg:text-lg">{blog.excerpt}</p>
        </div>
      </RevealOnLoad>

      <Reveal variants={fadeBlur} className="w-full max-w-7xl mx-auto overflow-hidden rounded-xl">
        <Image
          src={`${process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL}/${blog.image}`}
          alt={blog.title}
          width={1920}
          height={1080}
          priority
          sizes="(min-width: 1272px) 1152px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 40px)"
          className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-160"
        />
      </Reveal>
    </div>
  );
};
