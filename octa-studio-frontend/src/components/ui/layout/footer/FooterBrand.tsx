import Link from 'next/link';
import { CONTACT } from '@/utils/data/contact';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { Logo } from '@/components/ui/Logo';

export const FooterBrand = () => {
  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-start">
        <div className="w-35 shrink-0 transition-transform duration-300 hover:scale-[1.03] xl:w-40">
          <Link href="/" className="no-underline" aria-label="Ir al inicio">
            <Logo sizes="(min-width: 1280px) 160px, 140px" />
          </Link>
        </div>

        <p className="text-primary/75 hidden max-w-xl text-base lg:block lg:text-lg">
          Diseño y montaje de stands, shows, congresos y eventos masivos. Veinte años montando,
          con equipo propio de principio a fin.
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 lg:items-end">

        <LinkButtonLeft href={CONTACT.whatsapp.url}>Cotiza tu proyecto</LinkButtonLeft>
      </div>
    </div>
  );
};
