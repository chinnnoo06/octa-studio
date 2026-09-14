import { TSecondaryButtonProps } from './types/Buttons.types';

export const SecondaryButton = ({
  children,
  loading = false,
  disabled = false,
  type = 'submit',
  className,
}: TSecondaryButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`border border-secondary rounded-full font-medium text-sm lg:text-base bg-secondary text-primary hover:text-secondary hover:bg-primary inline-flex cursor-pointer items-center justify-center gap-2.5 px-5 py-2.5 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      {children}
    </button>
  );
};
