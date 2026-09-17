import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { CHANNELS } from '@/utils/data/contact';
import { ChannelCard } from './ChannelCard';

/** WhatsApp en sólido porque es el canal que se quiere empujar; el resto baja
 *  de peso por orden: tinte para el teléfono, blanco con borde para el correo. */
const VARIANT = ['dark', 'tint', 'white'] as const;

export const Channels = () => {
  return (
    <section data-section="channels" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Canales</Eyebrow>
          <SectionTitle lead="Elige cómo" rotating="hablamos" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <Reveal key={channel.id} className="h-full">
              <ChannelCard channel={channel} variant={VARIANT[i] ?? 'white'} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
