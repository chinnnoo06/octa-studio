/** Tipografia de todo el panel: envuelve tanto el login como el dashboard. */
export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="font-admin">{children}</div>;
}
