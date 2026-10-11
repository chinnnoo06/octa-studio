import Link from 'next/link';
import { TPanelButtonProps } from './types';

/** Boton de accion del panel ("Nuevo blog", "Añadir proyecto"...). Con `href` es un enlace. */
const VARIANT = {
  primary: 'border-secondary bg-secondary text-primary hover:-translate-y-px hover:border-[#145378] hover:bg-[#145378] hover:shadow-[0_4px_12px_rgba(24,96,140,0.25)]',
  outline: 'border-secondary bg-transparent text-secondary hover:bg-secondary/8',
} as const;

export const PanelButton = ({ href, onClick, children, variant = 'primary', className }: TPanelButtonProps) => {
  const classes = `inline-flex items-center justify-center gap-1.75 rounded-[8px] border px-4.5 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${VARIANT[variant]} ${className ?? ''}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
