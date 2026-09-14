import { SimpleHeader } from '@/components/ui/header/SimpleHeader';
import { Sidebar } from '@/components/ui/sidebar/Sidebar';
import { verifySession } from '@/services/auth/auth.dal';

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await verifySession();

  return (
    <>
      <SimpleHeader showMenu />

      <div className="mx-auto flex w-full gap-5 pt-18">
        <Sidebar />

        <main className="min-w-0 flex-1 px-5 py-10">{children}</main>
      </div>
    </>
  );
}
