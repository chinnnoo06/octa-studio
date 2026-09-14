'use client';

import Link from 'next/link';
import { HiArrowUpLeft } from 'react-icons/hi2';
import { TButtonProps } from './types/Buttons.types';

export const PrimaryButtonLeft = ({ href, children }: TButtonProps) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group inline-flex w-fit items-center gap-2.5"
    >
      <span
        aria-hidden="true"
        className="border-secondary bg-secondary text-primary group-hover:bg-primary group-hover:text-secondary md:bg-primary md:text-secondary ease-brand inline-flex shrink-0 items-center justify-center rounded-full border p-3.5 opacity-100 transition-all duration-300 md:-mr-14 lg:-mr-14.5 md:scale-75 md:opacity-0 md:group-hover:mr-0 md:group-hover:scale-100 md:group-hover:opacity-100"
      >
        <HiArrowUpLeft className="size-4 lg:size-4.5 stroke-1" />
      </span>

      <span className="border-secondary bg-secondary text-primary group-hover:text-secondary group-hover:bg-primary inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-sm font-medium transition-colors duration-300 lg:text-base">
        {children}
      </span>
    </Link>
  );
};
