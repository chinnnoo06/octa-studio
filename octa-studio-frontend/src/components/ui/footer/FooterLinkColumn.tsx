import Link from 'next/link';
import type { TNavLink } from '@/types/content';

const ALIGN = {
  start: 'lg:mr-auto lg:ml-0',
  center: 'lg:mx-auto',
  end: 'lg:ml-auto lg:mr-0',
} as const;

type TFooterLinkColumnProps = {
  title: string;
  links: readonly TNavLink[];
  align?: keyof typeof ALIGN;
};

export const FooterLinkColumn = ({
  title,
  links,
  align = 'center',
}: TFooterLinkColumnProps) => {
  return (
    <div className={`mx-auto flex w-fit max-w-full flex-col items-center gap-5 text-center ${ALIGN[align]}`}>
      <p className="text-primary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">{title}</p>

      <ul className="flex flex-col items-center gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-primary/75 hover:text-primary text-sm lg:text-base transition-colors duration-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
