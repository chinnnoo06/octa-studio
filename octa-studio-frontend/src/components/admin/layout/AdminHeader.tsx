'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { HamburgerButton } from '@/components/ui/layout/header/HamburgerButton';
import { LogoutButton } from '@/components/admin/auth/LogoutButton';
import { ADMIN_HOME } from '@/utils/data/admin';
import { useHeader } from '@/hooks/ui/useHeader';
import { AdminMobileNav } from './AdminMobileNav';

export const AdminHeader = () => {
    const { menuVisible, hamburgerRef, actions } = useHeader();

    return (
        <>
            <header className="bg-secondary-admin shrink-0 px-5">
                <div className="flex h-18 items-center justify-between">
                    <Link href={ADMIN_HOME} className="flex items-center gap-2.5" aria-label="Ir al inicio del panel">
                        <div className="w-18 xl:w-23 shrink-0">
                            <Logo />
                        </div>

                        <span className="border-primary-admin/30 text-primary-admin border-l pl-2.5 text-lg lg:text-xl font-semibold uppercase">
                            Panel
                        </span>
                    </Link>

                    <div className="lg:hidden">
                        <HamburgerButton
                            ref={hamburgerRef}
                            open={menuVisible}
                            toggleMenu={actions.toggleMenu}
                        />
                    </div>

                    <nav className="hidden flex-col items-end lg:flex" aria-label="Sesión">
                        <span className="text-primary-admin font-semibold">Administrador</span>

                        <LogoutButton
                            showIcon={false}
                            className="text-primary-admin text-base lg:text-lg font-semibold uppercase hover:underline"
                        />
                    </nav>
                </div>
            </header>

            <AdminMobileNav menuVisible={menuVisible} toggleMenu={actions.toggleMenu} />
        </>
    );
};
