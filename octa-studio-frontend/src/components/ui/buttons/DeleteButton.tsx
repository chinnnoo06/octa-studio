import { FaTrashCan } from 'react-icons/fa6';
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
      <FaTrashCan aria-hidden="true" className={ICON_BUTTON.icon} />
    </button>
  );
};
