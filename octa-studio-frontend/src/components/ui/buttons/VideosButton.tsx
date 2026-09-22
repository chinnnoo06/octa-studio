import Link from 'next/link';
import { FiVideo } from 'react-icons/fi';
import { TImagesButtonProps } from './types';

export const VideosButton = ({ href, label, className }: TImagesButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`text-fourth/75 hover:bg-secondary/15 hover:text-secondary inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-300 ${className ?? ''}`}
    >
      <FiVideo aria-hidden="true" className="size-4.5" />
    </Link>
  );
};
