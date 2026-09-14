import { TSecondaryButtonProps } from './types/Buttons.types';

export const ThirdButton = ({
  children,
  loading = false,
  disabled = false,
  type = 'submit',
  className,
  onClick,
}: TSecondaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`border border-secondary rounded-full font-medium text-sm lg:text-base bg-primary text-secondary hover:text-primary hover:bg-secondary inline-flex cursor-pointer items-center justify-center gap-2.5 px-5 py-2.5 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      {children}
    </button>
  );
};
