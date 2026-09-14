import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BrandBadge } from './BrandBadge';
import { AdvantageFan } from './AdvantageFan';
import { DetailStar } from './DetailStar';
import { PhotoTile } from './PhotoTile';
import { Reveal } from '@/components/ui/Reveal';
import ImgMarca from "@/assets/media/brand/ImgLogo.webp"
import ImgMontaje from '@/assets/media/stands/ImgStand14.webp';
import ImgRender from '@/assets/media/renders/ImgRender11.webp';
import ImgTrato from '@/assets/media/stands/ImgStand10.webp';

export const Advantages = () => {
  return (
    <section data-section="advantages" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col items-center gap-5">
          <Eyebrow>Nuestras Ventajas</Eyebrow>
          <SectionTitle align="center" lead="20 años sin" rotating="improvisar" />
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">

          <Reveal className="border-fourth/30 bg-primary flex min-h-70 items-center justify-center rounded-xl border p-5 w-75 shrink-0 snap-start sm:w-auto sm:shrink">
            <BrandBadge />
          </Reveal>

          <Reveal
            delay={0.08}
            className="border-fourth/30 bg-primary flex min-h-70 items-center justify-center rounded-xl border p-10 w-75 shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <Image
              src={ImgMarca}
              alt="Logotipo de Octa Building Studio"
              sizes="(min-width: 1024px) 300px, 220px"
              className="h-full w-full object-contain"
            />
          </Reveal>

          <Reveal
            delay={0.16}
            className="border-fourth/30 bg-secondary/15 flex min-h-70 flex-col justify-between gap-5 rounded-xl border p-5 sm:col-span-2 w-75 shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <h3 className="text-secondary max-w-90 font-semibold text-xl lg:text-2xl uppercase">
              Cobertura en todo México y en todo Estados Unidos
            </h3>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-secondary font-gentleman max-w-90 text-7xl lg:text-8xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                Sin Viaticos
              </p>

              <AdvantageFan />
            </div>
          </Reveal>

          <PhotoTile
            src={ImgMontaje}
            alt="Stand de PCP montado por Octa en feria"
            title="Montaje y desmontaje con equipo propio"
            className="min-h-100 sm:col-span-2"
            delay={0.24}
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={90}
          />

          <PhotoTile
            src={ImgRender}
            alt="Render tridimensional de un stand antes de fabricarse"
            title="Cada stand, diseñado desde cero"
            className="min-h-100"
            delay={0.32}
          />

          <PhotoTile
            src={ImgTrato}
            alt="Atención a visitantes en el mostrador de un stand"
            title="Trato directo, sin intermediarios"
            className="min-h-100"
            delay={0.4}
          >
            <DetailStar
              className="text-primary spin-slow size-15"
              style={{ ['--spin-duration' as string]: '6s' }}
            />
          </PhotoTile>
        </div>
      </div>
    </section>
  );
}
