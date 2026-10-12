import { TActionButtonProps } from './types';

const VARIANT = {
  solid: 'border-secondary-admin bg-secondary-admin text-primary-admin hover:-translate-y-px hover:bg-secondary-admin/90 px-5 py-2.5 text-sm lg:text-base',
  outline: 'border-fourth-admin/30 bg-primary-admin text-fourth-admin hover:border-fourth-admin/75 hover:bg-thrird-admin/50 px-5 py-2.5 text-xs lg:text-sm',
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
      className={`inline-flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-xl hover:shadow-lg border font-semibold whitespace-nowrap transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none ${VARIANT[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
};
