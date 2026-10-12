import Link from 'next/link';
import { TPanelButtonProps } from './types';

const VARIANT = {
  primary: 'border-secondary-admin bg-secondary-admin text-primary-admin hover:-translate-y-px hover:border-secondary-admin/90 hover:bg-secondary-admin/90',
  outline: 'border-secondary-admin bg-transparent text-secondary-admin hover:bg-secondary-admin/8',
} as const;

export const PanelButton = ({ href, onClick, children, variant = 'primary', className }: TPanelButtonProps) => {
  const classes = `inline-flex items-center justify-center gap-1.5 rounded-xl hover:shadow-lg border px-5 py-2.5 text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${VARIANT[variant]} ${className ?? ''}`;

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
