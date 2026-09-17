import { FiTrash2 } from 'react-icons/fi';
import { TDeleteButtonProps } from '@/types/buttons.types';


export const DeleteButton = ({ onClick, label, disabled = false, className }: TDeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`text-fourth/75 inline-flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors duration-300 hover:bg-red-600/10 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      <FiTrash2 aria-hidden="true" className="size-4.5" />
    </button>
  );
};
