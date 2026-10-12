'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { TBackButtonProps } from './types';

export const BackButton = ({ label = 'Volver', className }: TBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`border-fourth-admin/30 bg-primary-admin text-fourth-admin inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl hover:shadow-lg border px-5 py-2.5 text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-150 hover:border-fourth-admin/75 hover:bg-thrird-admin/50 ${className ?? ''}`}
    >
      <FaArrowLeft aria-hidden="true" className="size-4 lg:size-4.5" />
      {label}
    </button>
  );
};
