import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Pagination } from '@/components/ui/Pagination';
import { slugify } from '@/utils/slugify';
import { BlogCard } from '@/components/blogs/BlogCard';
import { CategoryFilter } from '@/components/blogs/CategoryFilter';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';
import type { TPagination } from '@/schemas/common/common.response.schemas';
import type { TBlogCategory } from '@/types/content.types';

type TPostsProps = {
  blogs: TBlog[];
  pagination: TPagination;
  /** Categoria activa; sin ella se listan todas. */
  category?: TBlogCategory;
};

export const Posts = ({ blogs, pagination, category }: TPostsProps) => {
  const active = category ? slugify(category) : undefined;
  const basePath = active ? `/blogs?categoria=${active}` : '/blogs';

  return (
    <section id="entradas" data-section="blogs" className="bg-primary scroll-mt-18 py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Diario de montaje</Eyebrow>
          <SectionTitle lead="Últimas" rotating="entradas" />
        </div>

        <CategoryFilter active={active} />

        {blogs.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Reveal key={blog._id} className="h-full">
                <BlogCard blog={blog} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="border-fourth/30 text-fourth/75 rounded-xl border p-5 text-sm lg:p-10 lg:text-base">
            Todavía no hay entradas en esta categoría.
          </p>
        )}

        <Pagination pagination={pagination} basePath={basePath} anchor="entradas" />
      </div>
    </section>
  );
};
