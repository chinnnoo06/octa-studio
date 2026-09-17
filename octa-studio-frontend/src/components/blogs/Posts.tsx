import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Pagination } from '@/components/ui/Pagination';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/utils/data/blogs';
import { paginate } from '@/utils/paginate';
import { slugify } from '@/utils/slugify';
import { BlogCard } from '@/components/blogs/BlogCard';
import { CategoryFilter } from '@/components/blogs/CategoryFilter';

const PAGE_SIZE = 6;

type TPostsProps = {
  page?: number;
  category?: string;
};

export const Posts = ({ page = 1, category }: TPostsProps) => {
  const selected = BLOG_CATEGORIES.find((c) => slugify(c) === category);
  const items = selected ? BLOG_POSTS.filter((post) => post.category === selected) : BLOG_POSTS;
  const { visible, pagination } = paginate(items, page, PAGE_SIZE);

  const basePath = selected ? `/blogs?categoria=${slugify(selected)}` : '/blogs';

  return (
    <section id="entradas" data-section="blogs" className="bg-primary scroll-mt-18 py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Diario de montaje</Eyebrow>
          <SectionTitle lead="Últimas" rotating="entradas" />
        </div>

        <CategoryFilter active={selected ? slugify(selected) : undefined} />

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <Reveal key={post.href} className="h-full">
                <BlogCard post={post} />
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
