import type { Metadata } from 'next';
import { AdminHeader } from '@/components/ui/layout/header/AdminHeader';
import { Sidebar } from '@/components/ui/layout/Sidebar';
import { verifySession } from '@/services/auth/auth.dal';

export const metadata: Metadata = {
  title: { default: 'Panel', template: '%s | Panel · Octa Building Studio' },
  robots: { index: false, follow: false, nocache: true },
};

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await verifySession();

  // El panel ocupa la ventana completa: header fijo arriba y el contenido
  // con su propio scroll, como una aplicacion.
  return (
    <div className="text-ink flex h-dvh flex-col">
      <AdminHeader />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main className="bg-canvas min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-3.75 pt-5 pb-10 md:px-7.5 md:pt-7.5 xl:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
