'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/utils/data/navigation';
import { cn } from '@/utils/cn';
import { Logo } from '../Logo';
import { HamburgerButton } from './HamburgerButton';
import { useHeader } from '@/hooks/ui/useHeader';
import { MobileNav } from './MobileNav';
import { isActiveHref } from '@/utils/isActiveHref';
import { CONTACT } from '@/utils/data/contact';
import { HiOutlinePhone } from 'react-icons/hi2';

export const Header = () => {
  const { menuVisible, hamburgerRef, actions } = useHeader()
  const pathname = usePathname();

  return (
    <>
      <header className='fixed top-0 inset-x-0 z-100 bg-secondary backdrop-blur-md border-b transition-colors duration-300 border-primary/30'
      >

        <div className="relative max-w-[1700px] mx-auto flex justify-between items-center w-full px-5 lg:px-15 h-18 gap-10">

          <div className="flex items-center justify-start shrink-0">
            <div className="w-18 xl:w-23 shrink-0 transition-transform duration-300 hover:scale-[1.03]">
              <Link href="/" className="no-underline" aria-label="Ir al inicio">
                <Logo sizes="(min-width: 1280px) 92px, 72px" />
              </Link>
            </div>
          </div>

          <div className='hidden lg:flex grow justify-center'>
            <nav aria-label="Navegación principal">
              <ul role="list" className="flex items-center gap-10 xl:gap-15">
                {NAV_LINKS.map((link) => {
                  const isActive = isActiveHref(pathname, link.href)

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className="group relative inline-block py-1"
                      >
                        <span
                          className="text-sm xl:text-base leading-none transition-colors duration-300 text-primary"
                        >
                          {link.label}
                        </span>
                        <span aria-hidden="true"
                          className={cn(
                            'absolute inset-x-0 bottom-0 h-[1.5px] origin-left',
                            isActive
                              ? 'bg-primary scale-x-100'
                              : 'bg-primary scale-x-0 transition-transform duration-300 ease-brand group-hover:scale-x-100',
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="hidden shrink-0 items-center justify-end lg:flex">
            <a
              href={CONTACT.phone.href}
              className="text-primary hover:text-primary/75 inline-flex items-center gap-2.5 text-sm leading-none whitespace-nowrap transition-colors duration-300 xl:text-base"
            >
              <HiOutlinePhone className="size-3.5 shrink-0 xl:size-4" />
              {CONTACT.phone.display}
            </a>
          </div>

          <div className="flex items-center justify-end shrink-0 lg:hidden">
            <HamburgerButton
              ref={hamburgerRef}
              open={menuVisible}
              toggleMenu={actions.toggleMenu}
            />
          </div>
        </div>

      </header>

      <MobileNav menuVisible={menuVisible} toggleMenu={actions.toggleMenu} />
    </>
  );
}
