import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import type { TBlogPost } from '@/types/content';

export const BlogCard = ({ post }: { post: TBlogPost }) => {
  return (
    <Link
      href={post.href}
      className="group border-fourth/30 bg-primary flex h-full flex-col gap-5 overflow-hidden rounded-xl border p-2.5 transition-colors duration-300 hover:border-secondary"
    >
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={post.image}
          alt={post.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="ease-brand h-50 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-60"
        />
        <span className="bg-primary text-secondary absolute top-2.5 left-2.5 rounded-lg px-2.5 py-1 font-gentleman text-3xl lg:text-4xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-2.5 pt-0">
        <p className="text-fourth/75 flex items-center gap-2.5 text-xs uppercase">
          {post.date}
          <span aria-hidden="true" className="bg-fourth/30 size-1 rounded-full" />
          <span className="flex items-center gap-1.5">
            <FaRegClock aria-hidden="true" className="size-3" />
            {post.readingTime}
          </span>
        </p>

        <h3 className="text-secondary text-xl font-semibold uppercase lg:text-2xl">{post.title}</h3>

        <p className="text-fourth/75 text-sm lg:text-base">{post.excerpt}</p>
      </div>
    </Link>
  );
};
