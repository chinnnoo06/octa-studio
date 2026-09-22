'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';

const ITEM =
    'flex items-center gap-2.5 px-5 py-3.5 text-sm lg:text-base transition-colors duration-300';

export const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (

        <aside className="hidden lg:block lg:sticky lg:top-18 lg:h-[calc(100vh-4.5rem)] lg:w-70 lg:shrink-0">
            <div className="border-secondary/30 flex flex-col  border lg:h-full">
                <nav aria-label="Panel de administración">
                    <ul role="list" className="flex flex-col">
                        {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
                            const active = isActive(href);

                            return (
                                <li key={href} className="border-secondary/30 border-b">
                                    <Link
                                        href={href}
                                        aria-current={active ? 'page' : undefined}
                                        className={`${ITEM} ${active
                                            ? 'bg-secondary/15 text-secondary'
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

                <LogoutButton className={`${ITEM} mt-auto hover:bg-red-600/10`}  />
            </div>
        </aside>
    );
};
