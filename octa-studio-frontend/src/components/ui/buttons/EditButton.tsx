import Link from 'next/link';
import { FaPenToSquare } from 'react-icons/fa6';
import { ICON_BUTTON } from './iconButton';
import { TEditButtonProps } from './types';

export const EditButton = ({ href, label, className }: TEditButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`${ICON_BUTTON.base} ${ICON_BUTTON.edit} ${className ?? ''}`}
    >
      <FaPenToSquare aria-hidden="true" className={ICON_BUTTON.icon} />
    </Link>
  );
};
