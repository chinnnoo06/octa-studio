import { FaWhatsapp } from 'react-icons/fa6';
import { CONTACT } from '@/utils/data/contact';
import Link from 'next/link';

export const WhatsAppButton = () => {
  return (
    <Link
      href={CONTACT.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={CONTACT.whatsapp.label}
      className="group border border-secondary bg-secondary text-primary hover:bg-primary hover:text-secondary fixed right-5 bottom-5 z-90 inline-flex items-center rounded-full p-3.5 shadow-lg shadow-black/20 transition duration-300 hover:scale-105 "
    >
      <FaWhatsapp className="size-6 lg:size-7 stroke-1 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden text-sm leading-none whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-50 group-hover:opacity-100 lg:inline-block">
        Escríbenos
      </span>
    </Link>
  );
};
