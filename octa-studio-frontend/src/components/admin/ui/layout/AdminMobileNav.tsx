'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/admin';
import { isActiveAdminHref } from '@/utils/activeHref';
import { LogoutButton } from '@/components/admin/auth/LogoutButton';
import { SIDEBAR_ITEM, SIDEBAR_TEXT } from './Sidebar';
import { useEffect } from 'react';
import { useLockBodyScroll } from '@/hooks/ui/useLockBodyScroll';

type TAdminMobileNavProps = {
    menuVisible: boolean;
    toggleMenu: () => void;
};

const ICON = 'size-4 lg:size-4.5';

export const AdminMobileNav = ({ menuVisible, toggleMenu }: TAdminMobileNavProps) => {
    const pathname = usePathname()

    useEffect(() => {
        if (!menuVisible) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") toggleMenu()
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [menuVisible, toggleMenu])

    useLockBodyScroll(menuVisible)

    return (
        <div
            inert={!menuVisible}
            aria-hidden={!menuVisible}
            className={`lg:hidden fixed inset-x-0 top-18 bottom-0 z-95 ${menuVisible ? "" : "pointer-events-none"}`}
        >
            <button
                type="button"
                tabIndex={-1}
                aria-label="Cerrar menú"
                onClick={toggleMenu}
                className={`absolute inset-0 bg-fourth-admin/50 transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            <aside
                className={`bg-secondary-admin absolute inset-y-0 left-0 w-[80%] max-w-xs overflow-y-auto transition-transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <nav aria-label="Panel de administración" className="flex h-full flex-col justify-between gap-2.5 px-2.5 py-10">
                    {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
                        const active = isActiveAdminHref(pathname, href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={toggleMenu}
                                aria-current={active ? 'page' : undefined}
                                className={`${SIDEBAR_ITEM} p-2.5 ${active ? 'bg-primary-admin/15 text-primary-admin' : ''}`}
                            >
                                <Icon aria-hidden="true" className={ICON} />
                                <span className={SIDEBAR_TEXT}>{label}</span>
                            </Link>
                        );
                    })}

                    <LogoutButton className={`${SIDEBAR_ITEM} p-2.5`} iconClassName={ICON} labelClassName={SIDEBAR_TEXT} />
                </nav>
            </aside>
        </div>
    );
};
