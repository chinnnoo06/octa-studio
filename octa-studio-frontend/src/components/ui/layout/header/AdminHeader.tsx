'use client';

import Link from 'next/link';
import { FaBars } from 'react-icons/fa6';
import { Logo } from '@/components/ui/Logo';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { ADMIN_HOME } from '@/utils/data/navigation';
import { useHeader } from '@/hooks/ui/useHeader';
import { AdminMobileNav } from './AdminMobileNav';

/** Header oscuro del panel: logo a la izquierda, usuario y salida a la derecha. */
export const AdminHeader = () => {
    const { menuVisible, hamburgerRef, actions } = useHeader();

    return (
        <>
            <header className="bg-panel shrink-0 p-5">
                <div className="flex items-center justify-between">
                    <Link href={ADMIN_HOME} className="flex h-12.5 items-center gap-2.5 md:h-15" aria-label="Ir al inicio del panel">
                        <div className="h-full w-auto [&_img]:h-full [&_img]:w-auto">
                            <Logo sizes="128px" />
                        </div>

                        <span className="border-primary/30 text-primary border-l pl-2.5 text-xl font-semibold uppercase md:text-[26px]">
                            Panel
                        </span>
                    </Link>

                    <button
                        ref={hamburgerRef}
                        type="button"
                        onClick={actions.toggleMenu}
                        aria-label={menuVisible ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuVisible}
                        className="text-primary cursor-pointer lg:hidden"
                    >
                        <FaBars aria-hidden="true" className="size-6" />
                    </button>

                    <nav className="hidden flex-col items-end lg:flex" aria-label="Sesión">
                        <span className="text-primary font-semibold">Administrador</span>

                        <LogoutButton
                            showIcon={false}
                            className="text-primary text-base font-semibold uppercase hover:underline"
                        />
                    </nav>
                </div>
            </header>

            <AdminMobileNav menuVisible={menuVisible} toggleMenu={actions.toggleMenu} />
        </>
    );
};
