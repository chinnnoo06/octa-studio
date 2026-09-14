'use client';

import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';
import { TButtonProps } from './types/Buttons.types';

export const PrimaryButton = ({ href, children }: TButtonProps) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group inline-flex w-fit items-center gap-2.5"
    >
      <span className="border border-secondary rounded-full font-medium text-sm lg:text-base bg-secondary text-primary group-hover:text-secondary group-hover:bg-primary inline-flex items-center justify-center px-6 py-2.5 transition-colors duration-300">
        {children}
      </span>

      <span aria-hidden="true"
        className="border border-secondary bg-secondary text-primary group-hover:bg-primary group-hover:text-secondary md:bg-primary md:text-secondary ease-brand inline-flex p-3.5 shrink-0 items-center justify-center rounded-full opacity-100 transition-all duration-300 md:-ml-14 lg:-ml-14.5 md:scale-75 md:opacity-0 md:group-hover:ml-0 md:group-hover:scale-100 md:group-hover:opacity-100"
      >
        <HiArrowUpRight className="size-4 lg:size-4.5 stroke-1" />
      </span>
    </Link>
  );
};
