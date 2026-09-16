import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { BLOG_POSTS } from '@/utils/data/blogs';
import { PostBox } from './PostBox';

/** Entradas por página, como en la referencia. */
const PAGE_SIZE = 5;

export const Posts = ({ page = 1 }: { page?: number }) => {
  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / PAGE_SIZE));
  const current = Math.min(Math.max(Math.trunc(page) || 1, 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = BLOG_POSTS.slice(start, start + PAGE_SIZE);

  return (
    <section data-section="blogs" className="bg-thrird py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:gap-20 lg:px-15">

        <div className="text-secondary flex w-full flex-col items-center gap-2.5 text-center lg:items-start lg:text-left">
          <Eyebrow>Diario de montaje</Eyebrow>
          <SectionTitle as="h1" size="hero" lead="Nuestro" rotating="blog" />

          <p className="text-fourth/75 max-w-5xl text-base lg:text-lg">
            Lo que aprendimos montando: cómo se decide el tamaño de un stand, qué revisar
            en el render antes de fabricar y por qué los tiempos de recinto mandan sobre
            todo lo demás.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7.5">
          {visible.map((post, i) => (
            <Reveal key={post.href} className="h-full">
              <PostBox post={post} />
            </Reveal>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Paginación del blog"
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {current > 1 && (
              <LinkButtonLeft href={`/blogs?page=${current - 1}`}>
                Página anterior
              </LinkButtonLeft>
            )}

            {current < totalPages && (
              <LinkButton href={`/blogs?page=${current + 1}`}>
                Página siguiente
              </LinkButton>
            )}
          </nav>
        )}
      </div>
    </section>
  );
};
