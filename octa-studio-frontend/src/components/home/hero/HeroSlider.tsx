import Image from 'next/image';
import { Marquee } from '@/components/ui/Marquee';
import Img1 from "@/assets/media/stands/ImgStand2.webp"
import Img2 from "@/assets/media/stands/ImgStand3.webp"
import Img3 from "@/assets/media/stands/ImgStand4.webp"
import Img4 from "@/assets/media/stands/ImgStand17.webp"
import Img5 from "@/assets/media/stands/ImgStand18.webp"
import Img6 from "@/assets/media/stands/ImgStand19.webp"

/** El hueco es fijo en cada corte: 126, 140, 240 y 350px ya sin el `border-5`. */
const SLIDE_SIZES = '(min-width: 1024px) 350px, (min-width: 768px) 240px, (min-width: 640px) 140px, 126px';

export const HeroSlider = () => {
  return (
    <Marquee duration={19.7} direction="left" gap={0} pauseOnHover={false}>
      <div className="border-primary h-37.5 w-34 shrink-0 overflow-hidden rounded-xl border-5 sm:h-40.5 sm:w-37.5 md:h-65.5 md:w-62.5 lg:h-100.5 lg:w-90">
        <Image
          src={Img1}
          alt="Montaje de stand"
          sizes={SLIDE_SIZES}
          className="size-full object-cover"
          priority
        />
      </div>

      <div className="border-primary h-37.5 w-34 shrink-0 overflow-hidden rounded-xl border-5 sm:h-40.5 sm:w-37.5 md:h-65.5 md:w-62.5 lg:h-100.5 lg:w-90">
        <Image
          src={Img2}
          alt=""
          sizes={SLIDE_SIZES}
          className="size-full object-cover"
        />
      </div>

      <div className="border-primary h-37.5 w-34 shrink-0 overflow-hidden rounded-xl border-5 sm:h-40.5 sm:w-37.5 md:h-65.5 md:w-62.5 lg:h-100.5 lg:w-90">
        <Image
          src={Img3}
          alt=""
          sizes={SLIDE_SIZES}
          className="size-full object-cover"
        />
      </div>

      <div className="border-primary h-37.5 w-34 shrink-0 overflow-hidden rounded-xl border-5 sm:h-40.5 sm:w-37.5 md:h-65.5 md:w-62.5 lg:h-100.5 lg:w-90">
        <Image
          src={Img4}
          alt=""
          sizes={SLIDE_SIZES}
          className="size-full object-cover"
        />
      </div>

      <div className="border-primary h-37.5 w-34 shrink-0 overflow-hidden rounded-xl border-5 sm:h-40.5 sm:w-37.5 md:h-65.5 md:w-62.5 lg:h-100.5 lg:w-90">
        <Image
          src={Img5}
          alt=""
          sizes={SLIDE_SIZES}
          className="size-full object-cover"
        />
      </div>

      <div className="border-primary h-37.5 w-34 shrink-0 overflow-hidden rounded-xl border-5 sm:h-40.5 sm:w-37.5 md:h-65.5 md:w-62.5 lg:h-100.5 lg:w-90">
        <Image
          src={Img6}
          alt=""
          sizes={SLIDE_SIZES}
          className="size-full object-cover"
        />
      </div>
    </Marquee>
  );
}
