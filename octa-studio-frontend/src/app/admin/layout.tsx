import { SimpleHeader } from "@/components/ui/header/SimpleHeader";

export default function AdminLoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SimpleHeader />

      <main>{children}</main>
    </>
  );
}
