import { SectionTitle } from '@/components/ui/SectionTitle';

type TLegalPageProps = {
  lead: string;
  rotating: string;
  updated: string;
  children: React.ReactNode;
};

export const LegalPage = ({ lead, rotating, updated, children }: TLegalPageProps) => {
  return (
    <section data-section="legal" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">
        <div className="text-secondary flex flex-col gap-5">
          <SectionTitle as="h1" size="hero" lead={lead} rotating={rotating} />
          <p className="text-fourth/75 text-sm lg:text-base">Última actualización: {updated}</p>
        </div>

        <div className="flex flex-col gap-10">{children}</div>
      </div>
    </section>
  );
};
