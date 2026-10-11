import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ToastNotification from '@/components/ui/ToastNotification';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const gentleman = localFont({
  src: '../assets/fonts/Gentleman on the Rainbow.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-gentleman-local',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Diseño y montaje de stands',
  keywords: [
    'stands para expos',
    'diseño de stands',
    'fabricación de stands',
    'montaje de stands',
    'stands para ferias',
    'stands Guadalajara',
    'stands Monterrey',
    'stands Ciudad de México',
    'stands en Estados Unidos',
    'montaje de congresos y convenciones',
    'escenarios para eventos masivos',
    'Octa Building Studio',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: '/',
    title: SITE.title,
    description: SITE.shortDescription,
  },
  twitter: {
    ...SHARED_TWITTER,
    title: SITE.title,
    description: SITE.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#18608C',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${gentleman.variable}`}
    >
      <body className="bg-primary text-fourth antialiased">
        <StructuredData />
        {children}
        <ToastNotification />
      </body>
    </html>
  );
}
