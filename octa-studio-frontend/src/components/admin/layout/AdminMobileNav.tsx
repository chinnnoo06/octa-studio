'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/admin';
import { isActiveAdminHref } from '@/utils/activeHref';
import { LogoutButton } from '@/components/admin/auth/LogoutButton';
import { SIDEBAR_ITEM, SIDEBAR_TEXT } from './Sidebar';

type TAdminMobileNavProps = {
    menuVisible: boolean;
    toggleMenu: () => void;
};

const ICON = 'size-4 lg:size-4.5';

export const AdminMobileNav = ({ menuVisible, toggleMenu }: TAdminMobileNavProps) => {
    const pathname = usePathname();

    return (
        <div
            inert={!menuVisible}
            aria-hidden={!menuVisible}
            className={`fixed inset-0 z-110 lg:hidden ${menuVisible ? '' : 'pointer-events-none'}`}
        >
            <button
                type="button"
                tabIndex={-1}
                aria-label="Cerrar menú"
                onClick={toggleMenu}
                className={`absolute inset-0 bg-fourth-admin/50 transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Mismo cajon de la sidebar, mas ancho, entrando desde la izquierda. */}
            <aside
                className={`bg-secondary-admin absolute inset-y-0 left-0 w-[250px] overflow-y-auto transition-transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : '-translate-x-full'}`}
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
