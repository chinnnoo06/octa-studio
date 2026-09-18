import type { Metadata } from 'next';

export const SITE_NAME = 'Octa Building Studio';

type TPageMetadata = {
  title: string;
  description: string;
  path: string;
};

export const pageMetadata = ({ title, description, path }: TPageMetadata): Metadata => {
  const full = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      type: 'website',
      locale: 'es_MX',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
    },
  };
};
