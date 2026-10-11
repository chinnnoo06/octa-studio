
export function isActiveHref(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** En el panel, `/admin` (Inicio) es prefijo de todo: solo cuenta la coincidencia exacta. */
export function isActiveAdminHref(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  return isActiveHref(pathname, href);
}
