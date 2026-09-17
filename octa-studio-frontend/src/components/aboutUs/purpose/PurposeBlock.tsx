import type { TPurpose } from '@/types/content.types';

type TPurposeBlockProps = {
  purpose: TPurpose;
  variant: 'tint' | 'dark';
};

export const PurposeBlock = ({ purpose, variant }: TPurposeBlockProps) => {
  const light = variant === 'dark';

  return (
    <div
      className={`flex h-full w-full flex-col justify-between gap-10 rounded-xl p-5 lg:p-10 ${light ? 'bg-secondary' : 'bg-secondary/15'}`}
    >
      {/* Mismo reparto que ServiceCard y StatCard: titulo Gentleman, subtitulo
          en semibold mayusculas y cuerpo `text-sm lg:text-base`, a `gap-2.5`. */}
      <div className="flex flex-col gap-2.5">
        <h3
          className={`font-gentleman text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case lg:text-6xl ${light ? 'text-primary' : 'text-secondary'}`}
        >
          {purpose.name}
        </h3>

        <p
          className={`text-xl lg:text-2xl font-semibold uppercase ${light ? 'text-primary' : 'text-secondary'}`}
        >
          {purpose.statement}
        </p>
      </div>

      <ul role="list" className="flex flex-col">
        {purpose.points.map((point, i) => (
          <li
            key={point}
            className={`flex gap-5 border-t py-3 last:pb-0 ${light ? 'border-primary/30' : 'border-fourth/30'}`}
          >
            <span
              aria-hidden="true"
              className={`shrink-0 text-sm lg:text-base font-medium ${light ? 'text-primary' : 'text-secondary'}`}
            >
              0{i + 1}
            </span>

            <p className={`text-sm lg:text-base ${light ? 'text-primary/75' : 'text-fourth/75'}`}>
              {point}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
