import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SERVICES } from '@/utils/data/services';
import { ServiceDetail } from './ServiceDetail';

export const ServiceDetails = () => {
  return (
    <section data-section="service-details" className="bg-thrird py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Lo que hacemos</Eyebrow>
          <SectionTitle lead="Todo el montaje, un solo" rotating="equipo" />
        </div>

        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.icon} service={service} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
};
