import { FAQS } from '@/utils/data/faqs';

/**
 * FAQPage de las preguntas frecuentes. Va solo en el inicio aunque la seccion
 * tambien salga en contacto: Google pide marcar cada bloque de FAQ en una sola URL.
 */
const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export const FaqStructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
  />
);
