import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { BlogCard } from '@/components/blogs/BlogCard';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';

export const Blogs = ({ blogs }: { blogs: TBlog[] }) => {
  if (blogs.length === 0) return null;

  return (
    <section data-section="blogs" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-5">
          <Eyebrow>Nuestro Blog</Eyebrow>
          <SectionTitle lead="Lo que aprendimos" rotating="montando" />
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Reveal
              key={blog._id}
              className="w-75 shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>

        <LinkButton href="/blogs">Ver más blogs</LinkButton>
      </div>
    </section>
  );
}
