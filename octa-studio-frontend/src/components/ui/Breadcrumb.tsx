import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import type { TBreadcrumbItem } from '@/types/common.types';

export const Breadcrumb = ({ items }: { items: TBreadcrumbItem[] }) => {
  const steps = [{ name: 'Inicio', path: '/' }, ...items];

  return (
    <nav aria-label="Migas de pan">
      <ol className="text-fourth/75 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-xs lg:text-sm">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;

          return (
            <li key={step.path} className={`flex items-center gap-1.5 ${last ? 'min-w-0' : ''}`}>
              {last ? (
                <span aria-current="page" className="text-fourth line-clamp-1">
                  {step.name}
                </span>
              ) : (
                <>
                  <Link href={step.path} className="hover:text-secondary transition-colors duration-300">
                    {step.name}
                  </Link>
                  <FiChevronRight aria-hidden="true" className="size-4 lg:size-4.5 shrink-0" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
