import { SITE } from '@/utils/data/site';
import { CONTACT } from '@/utils/data/contact';
import { SERVICES } from '@/utils/data/services';
import { FAQS } from '@/utils/data/faqs';
import { NAV_LINKS } from '@/utils/data/navigation';

export const dynamic = 'force-static';

/**
 * Resumen del sitio para buscadores con IA (llmstxt.org). Se arma con los mismos
 * datos de las secciones, asi no se queda desactualizado al cambiar el copy.
 */
const body = [
  `# ${SITE.name}`,
  '',
  `> ${SITE.description}`,
  '',
  '## Servicios',
  ...SERVICES.map((s) => `- [${s.title}](${SITE.url}${s.href}): ${s.description}`),
  '',
  '## Cobertura',
  `${CONTACT.coverage.summary}. Ciudades principales: ${CONTACT.coverage.cities.join(', ')}.`,
  '',
  '## Contacto',
  `- WhatsApp: ${CONTACT.whatsapp.display} (${CONTACT.whatsapp.url.split('?')[0]})`,
  `- Teléfono: ${CONTACT.phone.display}`,
  ...CONTACT.emails.map((m) => `- Correo (${m.label}): ${m.address}`),
  '',
  '## Preguntas frecuentes',
  ...FAQS.map((f) => `- ${f.question} ${f.answer}`),
  '',
  '## Páginas',
  ...NAV_LINKS.map((l) => `- [${l.label}](${SITE.url}${l.href === '/' ? '' : l.href})`),
  '',
].join('\n');

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
