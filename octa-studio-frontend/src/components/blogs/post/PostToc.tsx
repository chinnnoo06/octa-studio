import { FaListUl } from 'react-icons/fa6';
import type { TTocItem } from '@/utils/blogToc';

/** Indice del articulo: enlaces a los h2/h3 del contenido. */
export const PostToc = ({ items }: { items: TTocItem[] }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-labelledby="post-toc-title" className="border-fourth/30 mb-10 flex flex-col gap-5 rounded-xl border p-5 lg:p-10">
      <p id="post-toc-title" className="text-secondary flex items-center gap-2.5 text-xs font-semibold uppercase lg:text-sm">
        <FaListUl aria-hidden="true" className="size-4 lg:size-4.5" />
        En esta entrada
      </p>

      <ol className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-5' : ''}>
            <a
              href={`#${item.id}`}
              className="text-fourth/75 hover:text-secondary text-sm transition-colors duration-300 lg:text-base"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
