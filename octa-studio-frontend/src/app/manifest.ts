import type { MetadataRoute } from 'next';
import { SITE } from '@/utils/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: 'Octa Studio',
    description: SITE.shortDescription,
    lang: 'es-MX',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: SITE.themeColor,
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
