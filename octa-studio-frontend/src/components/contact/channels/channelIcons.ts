import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import type { TChannel } from '@/types/content.types';

/** Los mismos iconos que usa el footer para los mismos canales. */
export const CHANNEL_ICONS: Record<TChannel['id'], IconType> = {
  whatsapp: FaWhatsapp,
  telefono: FaPhone,
  correo: FaEnvelope,
};
