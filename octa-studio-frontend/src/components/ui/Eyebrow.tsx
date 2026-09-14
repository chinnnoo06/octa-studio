import { EyebrowIcon } from './EyebrowIcon';

export const Eyebrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2.5 text-current">
      <EyebrowIcon className="size-6 shrink-0 lg:size-8" />
      <p className="font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
        {children}
      </p>
    </div>
  );
};
