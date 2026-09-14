import Image from 'next/image';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { CONTACT } from '@/utils/data/contact';
import { ContactForm } from './ContactForm';
import ImgBg from '@/assets/media/contacto/ImgContactBg.webp';
import ImgSide from '@/assets/media/contacto/ImgContact.webp';

const MINI = [
  {
    icon: FiPhone,
    title: 'Teléfono',
    value: CONTACT.phone.display,
    href: CONTACT.phone.href,
  },
  {
    icon: FiMail,
    title: 'Correo',
    value: CONTACT.emails[0].address,
    href: CONTACT.emails[0].href,
  },
  {
    icon: FiMapPin,
    title: 'Dónde estamos',
    value: CONTACT.coverage.cities.join(' · '),
    href: undefined,
  },
];

export const Contact = () => {
  return (
    <section data-section="contact" className="bg-primary py-20 lg:py-25">
      <div className="flex flex-col gap-10 lg:gap-20">

        <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center gap-5 px-5 text-center lg:px-15">
          <Eyebrow>Hablemos</Eyebrow>
          <SectionTitle as="h1" size="hero" align="center" lead="Contacta con" rotating="nosotros" />

          <p className="text-fourth/75 max-w-3xl text-base lg:text-lg">
            Escríbenos para cotizar un stand, un evento o un congreso. Respondemos con
            propuesta, tiempos y presupuesto antes de que tengas que comprometerte a nada.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:gap-15">

          <div className="relative overflow-hidden px-5 py-5 lg:px-15 lg:py-25">
            <Image src={ImgBg} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
            <div aria-hidden="true" className="bg-fourth/40 absolute inset-0" />

            <div className="relative z-10 mx-auto grid w-full max-w-[1700px] gap-5 lg:grid-cols-[3fr_2fr] lg:gap-15">
              <Reveal className="bg-primary rounded-md p-5 sm:p-10 lg:px-5 lg:py-15">
                <ContactForm />
              </Reveal>

              <Reveal
                variants={fadeUpScale}
                delay={0.1}
                className="group overflow-hidden rounded-xl"
              >
                <Image
                  src={ImgSide}
                  alt=""
                  quality={90}
                  sizes="(min-width: 1024px) 40vw, calc(100vw - 40px)"
                  className="ease-brand h-75 w-full object-cover transition-transform duration-500 group-hover:scale-110 lg:h-full lg:min-h-168.5"
                />
              </Reveal>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-3 px-5 sm:flex-row sm:justify-center sm:gap-5 lg:px-15">
            {MINI.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <span
                    aria-hidden="true"
                    className="bg-secondary/15 text-secondary flex size-10 shrink-0 items-center justify-center rounded-full"
                  >
                    <Icon className="size-4.5" />
                  </span>

                  <span className="flex flex-col gap-1 text-center">
                    <span className="text-secondary text-base font-semibold uppercase lg:text-lg">
                      {item.title}
                    </span>
                    <span className="text-fourth/75 text-sm break-words lg:text-base">
                      {item.value}
                    </span>
                  </span>
                </>
              );

              return (
                <Reveal
                  key={item.title}
                  delay={i * 0.1}
                  className="border-fourth/30 bg-primary w-full rounded-md border sm:max-w-70.25"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:bg-secondary/15 flex h-full flex-col items-center gap-4 rounded-md p-5 transition-colors duration-300 lg:px-5 lg:py-7.5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col items-center gap-4 p-5 lg:px-5 lg:py-7.5">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
