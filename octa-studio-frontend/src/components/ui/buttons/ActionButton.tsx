import { TActionButtonProps } from './types';

// solid = boton principal del formulario (Guardar); outline = secundario (Cancelar).
const VARIANT = {
  solid: 'border-secondary bg-secondary text-primary hover:-translate-y-px hover:bg-[#145378] hover:shadow-[0_4px_12px_rgba(24,96,140,0.25)] px-6 py-[11px] text-[14px]',
  outline: 'border-slate-200 bg-primary text-ink hover:border-gray-600 hover:bg-slate-50 px-4 py-2.5 text-[13px]',
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
      className={`inline-flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border font-semibold whitespace-nowrap transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${VARIANT[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
};
