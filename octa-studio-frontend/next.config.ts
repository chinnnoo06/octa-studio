import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const backendOrigins = [
  ...new Set(
    [process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL, process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL]
      .filter((url): url is string => Boolean(url))
      .map((url) => new URL(url).origin),
  ),
];

const remotePatterns = backendOrigins.map((origin) => {
  const { protocol, hostname, port } = new URL(origin);

  return {
    protocol: protocol.replace(':', '') as 'http' | 'https',
    hostname,
    port,
    pathname: '/files/**',
  };
});

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      `img-src 'self' data: blob: ${backendOrigins.join(' ')}`.trim(),
      "media-src 'self'",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [{ source: '/terminos', destination: '/privacidad', permanent: true }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    dangerouslyAllowLocalIP: isDev,
    remotePatterns,
  },
};

export default nextConfig;
