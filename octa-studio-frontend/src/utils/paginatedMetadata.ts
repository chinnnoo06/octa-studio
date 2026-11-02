import type { Metadata } from 'next';

export const paginatedMetadata = (path: string, page?: string): Pick<Metadata, 'alternates' | 'robots'> => {
  const current = Number(page);

  if (!Number.isInteger(current) || current <= 1) {
    return { alternates: { canonical: path } };
  }

  return {
    alternates: { canonical: `${path}?page=${current}` },
    robots: { index: false, follow: true },
  };
};
