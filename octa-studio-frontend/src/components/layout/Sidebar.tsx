'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS, ADMIN_LOGOUT } from '@/utils/data/navigation';
import { logout } from '@/actions/logout.action';

const ITEM =
    'flex items-center gap-2.5 px-5 py-3.5 text-sm lg:text-base transition-colors duration-300';

export const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    const LogoutIcon = ADMIN_LOGOUT.icon;

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

                <form action={logout} className="mt-auto">
                    <button
                        type="submit"
                        className={`${ITEM} w-full cursor-pointer  text-red-600 hover:bg-red-600/10`}
                    >
                        <LogoutIcon aria-hidden="true" className="size-4.5 shrink-0" />
                        {ADMIN_LOGOUT.label}
                    </button>
                </form>
            </div>
        </aside>
    );
};
