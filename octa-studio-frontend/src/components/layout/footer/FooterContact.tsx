import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { CONTACT } from '@/utils/data/contact';

type TContactRowProps = {
  icon: IconType;
  label: string;
  value: string;
  href: string;
};

const ContactRow = ({ icon: Icon, label, value, href }: TContactRowProps) => {
  return (
    <li>
      <a
        href={href}
        aria-label={`${label}: ${value}`}
        className="text-primary/75 hover:text-primary group inline-flex max-w-full items-center gap-2.5 text-sm lg:text-base transition-colors duration-300"
      >
        <Icon aria-hidden="true" className="text-primary/75 group-hover:text-primary size-4 lg:size-4.5 stroke-1 shrink-0 transition-colors duration-300" />
        <span className="truncate">{value}</span>
      </a>
    </li>
  );
};

export const FooterContact = () => {
  return (
    <div className="mx-auto flex w-fit max-w-full flex-col items-center gap-5 text-center col-span-2 lg:col-span-1 lg:mr-0 lg:ml-auto">
      <p className="text-primary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">Contacto</p>

      <ul className="flex max-w-full flex-col items-center gap-2.5">
        <ContactRow
          icon={FaPhone}
          label="Teléfono"
          value={CONTACT.phone.display}
          href={CONTACT.phone.href}
        />
        <ContactRow
          icon={FaWhatsapp}
          label="WhatsApp"
          value={CONTACT.whatsapp.display}
          href={CONTACT.whatsapp.url}
        />
        {CONTACT.emails.map((m) => (
          <ContactRow
            key={m.address}
            icon={FaEnvelope}
            label={m.label}
            value={m.address}
            href={m.href}
          />
        ))}
      </ul>
    </div>
  );
};
