import { Sidebar } from '@/components/ui/sidebar/Sidebar';


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-5 lg:gap-10 px-5 lg:px-15 pt-18 lg:flex-row">
      <Sidebar />

      <div className="min-w-0 flex-1 py-10">{children}</div>
    </div>
  );
}
