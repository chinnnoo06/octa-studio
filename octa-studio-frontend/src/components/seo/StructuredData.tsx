import { SITE, BUSINESS } from '@/utils/data/site';
import { SERVICES } from '@/utils/data/services';

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#negocio`,
  name: SITE.name,
  legalName: BUSINESS.legalName,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
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
