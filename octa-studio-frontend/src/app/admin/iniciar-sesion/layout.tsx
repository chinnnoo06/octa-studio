import { SimpleHeader } from '@/components/layout/header/SimpleHeader';

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SimpleHeader />

      <main>{children}</main>
    </>
  );
}
