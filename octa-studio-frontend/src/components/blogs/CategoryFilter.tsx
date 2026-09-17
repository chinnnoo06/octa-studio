import Link from 'next/link';
import { BLOG_CATEGORIES } from '@/utils/data/blogs';
import { slugify } from '@/utils/slugify';

/** La pildora de ServiceCard: la activa va en solido, el resto con borde. */
const PILL =
  'flex h-10 shrink-0 items-center justify-center rounded-full border px-4 text-sm lg:text-base font-medium whitespace-nowrap transition-colors duration-300 lg:h-12 lg:px-5';

const ON = `${PILL} border-secondary bg-secondary text-primary`;
const OFF = `${PILL} border-secondary text-secondary hover:bg-secondary/15`;

type TCategoryFilterProps = {
  /** Slug de la categoria activa; sin el, "Todas". */
  active?: string;
};

/** Filtro por categoria del indice del blog. Es navegacion, no estado: cada
 *  pildora es un enlace con la categoria en la URL, y el ancla devuelve a la
 *  lista. En movil se desplaza en horizontal, como los carruseles del sitio. */
export const CategoryFilter = ({ active }: TCategoryFilterProps) => {
  return (
    <nav aria-label="Categorías del blog">
      <ul
        role="list"
        className="flex snap-x gap-2.5 overflow-x-auto pb-2.5 lg:flex-wrap lg:overflow-visible lg:pb-0"
      >
        <li className="snap-start">
          <Link href="/blogs#entradas" aria-current={active ? undefined : 'page'} className={active ? OFF : ON}>
            Todas
          </Link>
        </li>

        {BLOG_CATEGORIES.map((category) => {
          const slug = slugify(category);
          const on = slug === active;

          return (
            <li key={slug} className="snap-start">
              <Link
                href={`/blogs?categoria=${slug}#entradas`}
                aria-current={on ? 'page' : undefined}
                className={on ? ON : OFF}
              >
                {category}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
