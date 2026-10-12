import type { Metadata } from 'next';
import { SimpleHeader } from '@/components/admin/layout/SimpleHeader';

export const metadata: Metadata = {
  title: { absolute: 'Iniciar sesión | Panel · Octa Building Studio' },
  robots: { index: false, follow: false, nocache: true },
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SimpleHeader />

      <main className="bg-thrird-admin text-fourth-admin min-h-dvh pt-18">
        <div className="px-5 pt-5 pb-10 md:px-10 md:pt-10">{children}</div>
      </main>
    </>
  );
}
