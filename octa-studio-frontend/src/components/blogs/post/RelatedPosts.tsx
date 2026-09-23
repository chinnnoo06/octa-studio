import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { BlogCard } from '@/components/blogs/BlogCard';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';

export const RelatedPosts = ({ blogs }: { blogs: TBlog[] }) => {
  if (blogs.length === 0) return null;

  return (
    <section data-section="blog-related" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-secondary flex flex-col gap-2.5">
            <Eyebrow>Sigue leyendo</Eyebrow>
            <SectionTitle lead="Más del" rotating="blog" />
          </div>

          <LinkButton href="/blogs#entradas">Ver todas las entradas</LinkButton>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Reveal key={blog._id} className="h-full">
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
