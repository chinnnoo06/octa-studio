import { HiTrash } from 'react-icons/hi2';
import { ICON_BUTTON } from './iconButton';
import { TDeleteButtonProps } from './types';

export const DeleteButton = ({ onClick, label, disabled = false, className }: TDeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`${ICON_BUTTON.base} ${ICON_BUTTON.delete} ${className ?? ''}`}
    >
      <HiTrash aria-hidden="true" className={ICON_BUTTON.icon} />
    </button>
  );
};
