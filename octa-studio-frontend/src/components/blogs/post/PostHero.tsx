import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealOnLoad } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import { formatDate } from '@/utils/formatDate';
import { slugify } from '@/utils/slugify';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';

export const PostHero = ({ blog }: { blog: TBlog }) => {
  return (
    <section data-section="blog-hero" className="bg-primary pt-15 lg:pt-20">
      <div className="flex flex-col gap-10">
        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
          <RevealOnLoad variants={fadeBlur} className="flex flex-col gap-10">
            <div className="text-secondary flex flex-col items-start gap-2.5">
              <Link
                href={`/blogs?categoria=${slugify(blog.category)}#entradas`}
                className="hover:text-secondary/75 transition-colors duration-300"
              >
                <Eyebrow>{blog.category}</Eyebrow>
              </Link>

              <h1 className="text-[1.8rem] small:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold uppercase leading-[1.2] tracking-[-0.02em]">
                {blog.title}
              </h1>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-fourth/75 flex items-center gap-2.5 text-xs uppercase lg:text-sm">
                {formatDate(blog.createdAt)}
                <span aria-hidden="true" className="bg-fourth/30 size-1 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <FaRegClock aria-hidden="true" className="size-3" />
                  {blog.readingTime} min de lectura
                </span>
              </p>

              <p className="text-fourth/75 max-w-6xl text-base lg:text-lg">{blog.excerpt}</p>
            </div>
          </RevealOnLoad>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 lg:px-15">
          <Reveal variants={fadeBlur} className="max-w-7xl mx-auto overflow-hidden rounded-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL}/${blog.image}`}
              alt={blog.title}
              width={1920}
              height={1080}
              priority
              sizes="(min-width: 1272px) 1152px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 40px)"
              className="aspect-video w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
