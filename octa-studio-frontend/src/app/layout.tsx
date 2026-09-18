import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import ToastNotification from '@/components/ui/ToastNotification';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN ?? 'http://localhost:3000'),
  robots: { index: false, follow: false, nocache: true },
  title: {
    default: 'Octa Building Studio | Diseño y montaje de stands para expos y eventos',
    template: '%s | Octa Building Studio',
  },
  description:
    'Diseñamos, fabricamos, montamos y desmontamos stands para ferias, congresos y eventos masivos. 20 años de experiencia en Guadalajara, Monterrey, CDMX, todo México y Estados Unidos.',
  openGraph: {
    title: 'Octa Building Studio | Diseño y montaje de stands para expos y eventos',
    description:
      'Construyendo ideas, creando experiencias. Diseño, fabricación, montaje y desmontaje de stands a nivel nacional e internacional.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Octa Building Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Octa Building Studio | Diseño y montaje de stands para expos y eventos',
    description:
      'Construyendo ideas, creando experiencias. 20 años diseñando y montando stands en México y Estados Unidos.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${gentleman.variable}`}
    >
      <ReactQueryProvider>
      <body className="bg-primary text-fourth antialiased">
        {children}
         <ToastNotification />
      </body>
      </ReactQueryProvider>
    </html>
  );
}
