import { SITE } from '@/utils/data/site';
import type { TBreadcrumbItem } from '@/types/common.types';

/** BreadcrumbList que siempre arranca en Inicio; lo comparten las pages y la ficha de proyecto. */
export const breadcrumbList = (items: TBreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Inicio', path: '' }, ...items].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
});

export const BreadcrumbStructuredData = ({ items }: { items: TBreadcrumbItem[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList(items)) }}
  />
);
