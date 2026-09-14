'use client';

import { useState } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { CONTACT } from '@/utils/data/contact';

const FIELD =
  'border-fourth/30 bg-primary/0 text-fourth placeholder:text-fourth/50 focus:border-secondary w-full rounded-md border px-5 py-4.5 text-sm outline-none transition-colors duration-300';

/**
 * No hay backend: el envío compone el mensaje y abre WhatsApp, que es el canal
 * real de Octa. Los campos son los mismos que los de la referencia.
 */
export const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const texto = [
      `Hola, soy ${data.get('nombre') || ''}.`,
      data.get('asunto') ? `Asunto: ${data.get('asunto')}` : '',
      data.get('mensaje') ? `${data.get('mensaje')}` : '',
      data.get('telefono') ? `Tel: ${data.get('telefono')}` : '',
      data.get('email') ? `Correo: ${data.get('email')}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7.5 lg:gap-12.5">
      <h2 className="text-secondary text-center text-xl font-semibold uppercase leading-[1.25] sm:text-[1.375rem] lg:text-left lg:text-[2rem]">
        Cuéntanos qué necesitas montar y te acompañamos desde la primera idea.
      </h2>

      <div className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <input name="nombre" required placeholder="Nombre completo" className={FIELD} />
          <input name="telefono" type="tel" placeholder="Teléfono" className={FIELD} />
          <input name="email" type="email" placeholder="Correo electrónico" className={FIELD} />
          <input name="asunto" placeholder="Asunto" className={FIELD} />
        </div>

        <textarea name="mensaje" rows={3} placeholder="Mensaje" className={`${FIELD} resize-none`} />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="group inline-flex w-fit cursor-pointer items-center gap-2.5">
          <span className="border-secondary bg-secondary text-primary group-hover:text-secondary group-hover:bg-primary inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-sm font-medium transition-colors duration-300 lg:text-base">
            Enviar mensaje
          </span>

          <span
            aria-hidden="true"
            className="border-secondary bg-secondary text-primary group-hover:bg-primary group-hover:text-secondary md:bg-primary md:text-secondary ease-brand inline-flex shrink-0 items-center justify-center rounded-full border p-3.5 transition-all duration-300 md:-ml-14 md:scale-75 md:opacity-0 md:group-hover:ml-0 md:group-hover:scale-100 md:group-hover:opacity-100 lg:-ml-14.5"
          >
            <HiArrowUpRight className="size-4 stroke-1 lg:size-4.5" />
          </span>
        </button>

        {sent && (
          <p role="status" className="text-fourth/75 text-sm">
            Se abrió WhatsApp con tu mensaje listo para enviar.
          </p>
        )}
      </div>
    </form>
  );
};
