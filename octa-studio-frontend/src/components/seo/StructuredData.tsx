import { SITE, BUSINESS } from '@/utils/data/site';
import { SERVICES } from '@/utils/data/services';
import { CONTACT } from '@/utils/data/contact';

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#negocio`,
  name: SITE.name,
  legalName: BUSINESS.legalName,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  image: `${SITE.url}${SITE.ogImage}`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      areaServed: ['MX', 'US'],
      availableLanguage: 'es',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      name: 'WhatsApp',
      telephone: BUSINESS.whatsapp,
      url: CONTACT.whatsapp.url,
      areaServed: ['MX', 'US'],
      availableLanguage: 'es',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: BUSINESS.areaServed,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de diseño, fabricación y montaje de stands',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `${SITE.url}${service.href}`,
      },
    })),
  },
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'es-MX',
  publisher: { '@id': `${SITE.url}/#negocio` },
};

export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusiness, website]) }}
  />
);
