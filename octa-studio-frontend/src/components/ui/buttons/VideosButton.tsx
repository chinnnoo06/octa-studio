import Link from 'next/link';
import { FaVideo } from 'react-icons/fa6';
import { ICON_BUTTON } from './iconButton';
import { TImagesButtonProps } from './types';

export const VideosButton = ({ href, label, className }: TImagesButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`${ICON_BUTTON.base} ${ICON_BUTTON.view} ${className ?? ''}`}
    >
      <FaVideo aria-hidden="true" className={ICON_BUTTON.icon} />
    </Link>
  );
};
