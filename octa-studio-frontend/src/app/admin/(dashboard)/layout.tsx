import type { Metadata } from 'next';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { Sidebar } from '@/components/admin/layout/Sidebar';
import { verifySession } from '@/services/auth/auth.dal';

export const metadata: Metadata = {
  title: { default: 'Panel', template: '%s | Panel · Octa Building Studio' },
  robots: { index: false, follow: false, nocache: true },
};

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await verifySession();

  // El panel ocupa la ventana completa: header fijo arriba y el contenido
  // con su propio scroll, como una aplicacion. `relative` en <main> es
  // necesario: los inputs de archivo ocultos (`sr-only`, absolutos) se
  // ubicarian respecto a la pagina y le añadirian un segundo scroll en blanco.
  return (
    <div className="text-fourth-admin flex h-dvh flex-col">
      <AdminHeader />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main className="bg-thrird-admin relative min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-5 pt-5 pb-10 md:px-10 md:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
