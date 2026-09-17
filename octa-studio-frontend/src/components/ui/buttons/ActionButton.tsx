import { TActionButtonProps } from '@/types/buttons.types';

const VARIANT = {
  solid: 'bg-secondary text-primary hover:text-secondary hover:bg-primary',
  outline: 'bg-primary text-secondary hover:text-primary hover:bg-secondary',
} as const;

export const ActionButton = ({
  children,
  loading = false,
  disabled = false,
  type = 'submit',
  variant = 'solid',
  className,
  onClick,
}: TActionButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`border border-secondary rounded-full font-medium text-sm lg:text-base ${VARIANT[variant]} inline-flex cursor-pointer items-center justify-center gap-2.5 px-5 py-2.5 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      {children}
    </button>
  );
};
