'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/admin';
import { isActiveAdminHref } from '@/utils/activeHref';
import { LogoutButton } from '@/components/admin/auth/LogoutButton';

/** Enlace de la sidebar: icono arriba y texto debajo, en columna estrecha. */
export const SIDEBAR_ITEM =
    'flex w-full flex-col items-center rounded-[10px] p-2.5 text-primary-admin/75 transition-all duration-300 hover:bg-primary-admin/15 hover:text-primary-admin';

export const SIDEBAR_ICON = 'size-4 lg:size-4.5';

export const SIDEBAR_TEXT =
    'mt-1.5 flex min-h-[2.4em] w-full items-center justify-center text-center text-[10px] font-semibold uppercase leading-[1.2] wrap-break-word';

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="bg-secondary-admin border-primary-admin/30 border-t hidden w-[135px] shrink-0 overflow-y-auto lg:block">
            <nav aria-label="Panel de administración" className="flex flex-col gap-2.5 p-2.5">
                {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
                    const active = isActiveAdminHref(pathname, href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={`${SIDEBAR_ITEM} ${active ? 'bg-primary-admin/15 text-primary-admin' : ''}`}
                        >
                            <Icon aria-hidden="true" className={SIDEBAR_ICON} />
                            <span className={SIDEBAR_TEXT}>{label}</span>
                        </Link>
                    );
                })}

                {/* Cerrar sesion es una accion, no navegacion, pero luce como un enlace mas. */}
                <LogoutButton className={SIDEBAR_ITEM} iconClassName={SIDEBAR_ICON} labelClassName={SIDEBAR_TEXT} />
            </nav>
        </aside>
    );
};
