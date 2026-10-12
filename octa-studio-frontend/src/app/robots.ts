import type { MetadataRoute } from 'next';
import { SITE } from '@/utils/data/site';

export const dynamic = 'force-static';

const PRIVATE_PATHS = ['/admin', '/api'];

/** Rastreadores de buscadores con IA: se permiten de forma explicita para que citen el sitio. */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
