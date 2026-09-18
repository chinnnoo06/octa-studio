import { FaRegCalendar, FaRegClock, FaTag } from 'react-icons/fa6';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { BlogContent } from './BlogContent';
import { formatDate } from '@/utils/formatDate';
import { slugify } from '@/utils/slugify';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';

const LABEL = 'text-secondary text-xs font-semibold uppercase lg:text-sm';
const VALUE = 'text-fourth/75 text-sm lg:text-base';

const TILE = 'bg-primary text-secondary flex size-10 shrink-0 items-center justify-center rounded-xl lg:size-12';

export const PostBody = ({ blog }: { blog: TBlog }) => {
  return (
    <section data-section="blog-body" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:flex-row lg:px-15">

        <aside className="flex lg:sticky lg:top-24 lg:w-80 lg:shrink-0 lg:self-start">
          <div className="bg-secondary/15 flex flex-col gap-5 rounded-xl p-5 lg:p-10">
            <p className="font-gentleman text-secondary text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
              Sobre esta entrada
            </p>

            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-5">
                <span className={TILE}>
                  <FaRegCalendar aria-hidden="true" className="size-4 lg:size-4.5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className={LABEL}>Publicado</span>
                  <span className={VALUE}>{formatDate(blog.createdAt)}</span>
                </div>
              </li>

              <li className="flex items-center gap-5">
                <span className={TILE}>
                  <FaRegClock aria-hidden="true" className="size-4 lg:size-4.5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className={LABEL}>Lectura</span>
                  <span className={VALUE}>{blog.readingTime} min</span>
                </div>
              </li>

              <li className="flex items-center gap-5">
                <span className={TILE}>
                  <FaTag aria-hidden="true" className="size-4 lg:size-4.5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className={LABEL}>Categoría</span>
                  <span className={VALUE}>{blog.category}</span>
                </div>
              </li>
            </ul>


            <div className="border-secondary/30 flex flex-col items-start gap-5 border-t pt-5 lg:pt-10">
              <LinkButton href={`/blogs?categoria=${slugify(blog.category)}#entradas`}>
                Ver la categoría
              </LinkButton>
              <LinkButton href="/blogs#entradas">Volver al blog</LinkButton>
            </div>
          </div>
        </aside>

        <article className="min-w-0 flex-1">
          <BlogContent html={blog.content} />
        </article>
      </div>
    </section>
  );
};
