'use client';

import { useRouter } from 'next/navigation';
import { HiArrowUpLeft } from 'react-icons/hi2';
import { TBackButtonProps } from './types';

export const BackButtonLeft = ({ label = 'Volver', className }: TBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`group inline-flex w-fit cursor-pointer items-center gap-2.5 ${className ?? ''}`}
    >
      <span
        aria-hidden="true"
        className="border-secondary-admin bg-secondary-admin text-primary-admin group-hover:bg-primary-admin group-hover:text-secondary-admin md:bg-primary-admin md:text-secondary-admin ease-brand inline-flex shrink-0 items-center justify-center rounded-full border size-11.5 lg:size-12 opacity-100 transition-all duration-300 md:-mr-14 lg:-mr-14.5 md:scale-75 md:opacity-0 md:group-hover:mr-0 md:group-hover:scale-100 md:group-hover:opacity-100"
      >
        <HiArrowUpLeft className="size-4 lg:size-4.5 stroke-1" />
      </span>

      <span className="border-secondary-admin bg-secondary-admin text-primary-admin group-hover:text-secondary-admin group-hover:bg-primary-admin inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm lg:text-base font-medium transition-colors duration-300">
        {label}
      </span>
    </button>
  );
};
