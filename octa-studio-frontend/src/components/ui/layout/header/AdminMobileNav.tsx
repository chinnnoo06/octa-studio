'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';

type TAdminMobileNavProps = {
    menuVisible: boolean;
    toggleMenu: () => void;
};

const ITEM = 'flex items-center gap-2.5 px-5 py-4 text-base transition-colors duration-300';

export const AdminMobileNav = ({ menuVisible, toggleMenu }: TAdminMobileNavProps) => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;


    return (
        <div
            inert={!menuVisible}
            aria-hidden={!menuVisible}
            className={`lg:hidden fixed inset-x-0 top-18 bottom-0 z-95 ${menuVisible ? '' : 'pointer-events-none'}`}
        >
            <button
                type="button"
                tabIndex={-1}
                aria-label="Cerrar menú"
                onClick={toggleMenu}
                className={`bg-fourth/50 absolute inset-0 transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* El cajon entra desde la izquierda, en el mismo lado y con el mismo
                ancho que la Sidebar de escritorio. */}
            <div
                className={`bg-primary border-secondary/30 absolute inset-y-0 left-0 flex w-70 max-w-[80%] flex-col overflow-y-auto overscroll-contain border-r transition-transform duration-300 ease-out ${menuVisible ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <nav aria-label="Panel de administración">
                    <ul role="list" className="flex flex-col">
                        {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
                            const active = isActive(href);

                            return (
                                <li key={href} className="border-secondary/30 border-b">
                                    <Link
                                        href={href}
                                        onClick={toggleMenu}
                                        aria-current={active ? 'page' : undefined}
                                        className={`${ITEM} ${active
                                            ? 'bg-secondary text-primary'
                                            : 'text-secondary hover:bg-secondary/15'
                                            }`}
                                    >
                                        <Icon aria-hidden="true" className="size-4.5 shrink-0" />
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Fuera del <nav>: cerrar sesion es una accion, no navegacion. */}
                <LogoutButton className={`${ITEM} border-secondary/30 mt-auto border-t`} />
            </div>
        </div>
    );
};
