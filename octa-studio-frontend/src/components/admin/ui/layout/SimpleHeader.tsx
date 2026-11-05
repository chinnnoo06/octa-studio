'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { HamburgerButton } from '@/components/ui/layout/header/HamburgerButton';
import { AdminMobileNav } from './AdminMobileNav';
import { useHeader } from '@/hooks/ui/useHeader';

export const SimpleHeader = ({ showMenu = false }: { showMenu?: boolean;}) => {
    const { menuVisible, hamburgerRef, actions } = useHeader();

    return (
        <>
            <header className='fixed top-0 inset-x-0 z-100 bg-secondary-admin backdrop-blur-md border-b transition-colors duration-300 border-primary-admin/30'>

                <div className={`relative max-w-[1700px] mx-auto flex items-center w-full px-5 lg:px-15 h-18 gap-10 ${showMenu ? 'justify-between lg:justify-center' : 'justify-center'
                    }`}>

                    <div className="flex items-center justify-start shrink-0">
                        <Link href="/" className="flex items-center gap-2.5" aria-label="Ir al inicio">
                            <div className="w-18 xl:w-23 shrink-0">
                                <Logo />
                            </div>

                            <span className="border-primary-admin/30 text-primary-admin border-l pl-2.5 text-lg lg:text-xl font-semibold uppercase">
                                Panel
                            </span>
                        </Link>
                    </div>

                    {showMenu && (
                        <div className="flex items-center justify-end shrink-0 lg:hidden">
                            <HamburgerButton
                                ref={hamburgerRef}
                                open={menuVisible}
                                toggleMenu={actions.toggleMenu}
                            />
                        </div>
                    )}

                </div>
            </header>

            {showMenu && (
                <AdminMobileNav menuVisible={menuVisible} toggleMenu={actions.toggleMenu} />
            )}
        </>
    )
}
