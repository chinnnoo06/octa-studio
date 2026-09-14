import { cn } from '@/utils/cn';

export const Marquee = ({
  children,
  duration = 40,
  direction = 'left',
  pauseOnHover = true,
  className,
  gap = 40,
}: {
  children: React.ReactNode;
  /** Segundos por vuelta completa. Más alto = más lento. */
  duration?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  /** Separación entre items, en píxeles. */
  gap?: number;
}) => {
  const half = (
    <div
      className="flex shrink-0 items-center"
      style={{ gap: `${gap}px`, paddingInlineEnd: `${gap}px` }}
    >
      {children}
    </div>
  );

  return (
    <div
      className={cn('marquee-root relative w-full overflow-hidden', className)}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        data-direction={direction}
        data-pause-on-hover={pauseOnHover}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {half}
        {half}
      </div>
    </div>
  );
}
