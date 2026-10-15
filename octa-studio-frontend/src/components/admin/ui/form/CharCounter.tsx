type TCharCounterProps = {
  value?: string;
  /** Desde aqui la longitud se considera buena para buscadores. */
  optimalMin: number;
  max: number;
};

const FILL = {
  empty: '',
  good: 'bg-secondary-admin',
  warn: 'bg-[#FBC02D]',
  error: 'bg-red-700',
} as const;

/** "34/60" con una barra que pasa de ambar (corto) a azul (bien) y a rojo (se pasa). */
export const CharCounter = ({ value = '', optimalMin, max }: TCharCounterProps) => {
  const length = value.length;

  const status: keyof typeof FILL =
    length === 0 ? 'empty' : length > max ? 'error' : length >= optimalMin ? 'good' : 'warn';

  return (
    <div className="mt-1.5 flex items-center justify-end gap-2.5 text-xs lg:text-sm text-fourth-admin/75" aria-live="polite">
      <span>
        {length}/{max}
      </span>
      <div className="h-1.25 w-20 overflow-hidden rounded-xl bg-fourth-admin/10" aria-hidden="true">
        <div
          className={`h-full rounded-xl transition-[width,background-color] duration-300 ${FILL[status]}`}
          style={{ width: `${Math.min((length / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};
