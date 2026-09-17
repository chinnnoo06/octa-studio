import Image from 'next/image';
import { NAV_LINKS } from '@/utils/data/navigation';
import { SERVICES } from '@/utils/data/services';
import { FooterBrand } from './FooterBrand';
import { FooterLinkColumn } from './FooterLinkColumn';
import { FooterContact } from './FooterContact';
import Img from '@/assets/media/backgrounds/ImgBackground1.webp';
import { FooterBottomBar } from './FooterBottomBar';

export const Footer = () => {
  return (
    <footer data-section="footer" className="bg-fourth relative overflow-hidden py-20 lg:py-25">
      <Image src={Img} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-left lg:object-center" />

      <div aria-hidden="true" className="bg-fourth/25 absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15 ">
        <FooterBrand />

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-3 lg:gap-20">
          <FooterLinkColumn title="Navegación" links={NAV_LINKS} align="start" />
          <FooterLinkColumn
            title="Servicios"
            align="center"
            links={SERVICES.map((s) => ({ label: s.title, href: s.href }))}
          />
          <FooterContact />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}

