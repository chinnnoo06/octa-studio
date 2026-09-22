import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { TEditButtonProps } from './types';

export const EditButton = ({ href, label, className }: TEditButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`text-fourth/75 hover:bg-secondary/15 hover:text-secondary inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-300 ${className ?? ''}`}
    >
      <FiEdit2 aria-hidden="true" className="size-4.5" />
    </Link>
  );
};
