'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiFileText, FiFolder, FiLogOut, FiPlus, FiMessageSquare } from 'react-icons/fi';
import { isActiveHref } from '@/utils/isActiveHref';
import { logout } from '@/actions/logout.action';

/**
 * Las de "Agregar" son accesibles desde dos sitios: desde aqui y desde el
 * listado correspondiente. `exact` distingue esos dos casos al marcar el
 * activo, porque `/admin/blogs` es prefijo de `/admin/blogs/crear` y si no,
 * se encenderian los dos a la vez.
 */
const LINKS = [
    { href: '/admin/blogs', label: 'Blogs', icon: FiFileText, exact: false },
    { href: '/admin/blogs/crear', label: 'Agregar blog', icon: FiPlus, exact: true },
    { href: '/admin/proyectos', label: 'Proyectos', icon: FiFolder, exact: false },
    { href: '/admin/proyectos/crear', label: 'Agregar proyecto', icon: FiPlus, exact: true },
    { href: '/admin/testimonios', label: 'Testimonios', icon: FiMessageSquare, exact: false },
    { href: '/admin/testimonios/crear', label: 'Agregar testimonio', icon: FiPlus, exact: true },
] as const;

const ITEM =
    'flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-sm lg:text-base transition-colors duration-300';

export const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (href: string, exact: boolean) =>
        exact ? pathname === href : isActiveHref(pathname, href) && pathname !== `${href}/crear`;

    return (
 
        <aside className="lg:sticky lg:top-23 lg:flex lg:h-[calc(100vh-7.75rem)] lg:w-70 lg:shrink-0 lg:flex-col">
            <nav aria-label="Panel de administración">
                <ul role="list" className="flex flex-col gap-2.5">
                    {LINKS.map(({ href, label, icon: Icon, exact }) => {
                        const active = isActive(href, exact);

                        return (
                            <li key={href}>
                                <Link
                                    href={href}
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

            {/* Fuera del <nav> a proposito: cerrar sesion no es navegacion, es una
                accion. Y como server action en un <form>, borra la cookie en el
                servidor y funciona aunque el JS no haya cargado. */}
            <form action={logout} className="border-fourth/30 mt-5 border-t pt-5 lg:mt-auto">
                <button
                    type="submit"
                    className={`${ITEM} w-full cursor-pointer text-red-600 hover:bg-red-600/10`}
                >
                    <FiLogOut aria-hidden="true" className="size-4.5 shrink-0" />
                    Cerrar sesión
                </button>
            </form>
        </aside>
    );
};
