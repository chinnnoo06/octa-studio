import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';
import type { TProcessStep } from '@/types/content';
import StepArrow from './StepArrow';

type TProccessCardProps = {
  step: TProcessStep;
  index: number;
  hasArrow?: boolean;
  className?: string;
}

export const ProccessCard = ({ step, index, hasArrow = false, className }: TProccessCardProps) => {
  return (
    <Reveal
      delay={index * 0.08}
      className={cn(
        'border-primary/30 mx-auto flex h-full max-w-150 items-center justify-end gap-2.5 rounded-xl border p-2.5',
        'xl:rounded-none xl:border-0 xl:p-0',
        className,
      )}
    >
      {hasArrow ? <StepArrow /> : null}

      <div className="flex w-full flex-col gap-10 sm:grid sm:grid-cols-2 sm:items-center sm:justify-items-start sm:gap-5 md:flex md:flex-col xl:max-w-95 xl:gap-10">
        <div className="flex w-full flex-col gap-5">
          <p className="text-primary/75 font-gentleman flex items-center gap-2.5 text-3xl lg:text-4xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
            <span aria-hidden="true" className="bg-primary/75 size-2.5 shrink-0 rounded-full" />
            {step.step}
          </p>

          <div className="overflow-hidden rounded-xl">
            <Image
              src={step.img}
              alt={step.alt}
              sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 400px"
              className="h-50 w-full object-cover md:h-35 xl:h-40 xl:min-w-50"
            />
          </div>
        </div>

        <div className="flex h-full w-full flex-col gap-5 sm:justify-between sm:gap-10 md:justify-start md:gap-2.5 xl:max-w-70">
          <h3 className="text-primary text-xl lg:text-2xl font-semibold uppercase">
            {step.title}
          </h3>
          <p className="text-primary/75 text-sm lg:text-base">{step.description}</p>
        </div>
      </div>
    </Reveal>
  );
}