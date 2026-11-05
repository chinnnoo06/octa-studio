import type { Metadata } from 'next';
import { AdminHeader } from '@/components/admin/ui/layout/AdminHeader';
import { Sidebar } from '@/components/admin/ui/layout/Sidebar';
import { verifySession } from '@/services/auth/auth.dal';

export const metadata: Metadata = {
  title: { default: 'Panel', template: '%s | Panel · Octa Building Studio' },
  robots: { index: false, follow: false, nocache: true },
};

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await verifySession();

  return (
    <div>
      <AdminHeader />

      <div className="flex min-h-0 flex-1 h-dvh overflow-hidden">
        <Sidebar />

        <main className="bg-third-admin relative min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-5 pt-5 pb-10 lg:px-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
