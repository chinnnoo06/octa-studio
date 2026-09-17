"use client"

import Link from "next/link"
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { NAV_LINKS } from "@/utils/data/navigation";
import { isActiveHref } from "@/utils/isActiveHref";
import { usePathname } from "next/navigation";

type TMobileNavProps = {
    menuVisible: boolean
    toggleMenu: () => void
}

export const MobileNav = ({ menuVisible, toggleMenu }: TMobileNavProps) => {
    const pathname = usePathname();

    return (
        <div
            inert={!menuVisible}
            aria-hidden={!menuVisible}
            className={`lg:hidden fixed inset-x-0 top-18 bottom-0 z-95 transition-opacity duration-300 ${menuVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >

            <div className="absolute inset-0 bg-secondary backdrop-blur-md" />

            <div
                className={`absolute inset-0 origin-top overflow-y-auto overflow-x-hidden overscroll-contain flex flex-col py-5 transition-transform duration-300 ease-out ${menuVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <span className="px-5 inline-flex items-center gap-2.5 text-[0.6875rem] tracking-[0.3em] uppercase text-primary">
                    <span className="w-7.5 h-px bg-primary" />
                    Menú
                </span>

                <nav aria-label="Menú móvil" className="mt-5">
                    <ul role="list" className="flex flex-col">
                        {NAV_LINKS.map((link, i) => {
                            const isActive = isActiveHref(pathname, link.href)

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={toggleMenu}
                                        aria-current={isActive ? "page" : undefined}
                                        style={{ transitionDelay: menuVisible ? `${120 + i * 60}ms` : "0ms" }}
                                        className={`group relative flex items-center justify-between border-b border-primary/30 py-5 px-5 pl-5 transition-all duration-300 ${menuVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                                            }`}
                                    >
                                        <span
                                            className={`absolute left-5 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ${isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100"
                                                }`}
                                        />

                                        <span className="flex items-baseline gap-5 px-5">
                                            <span className={`text-[0.6875rem] tracking-[0.3em] transition-colors duration-300 ${isActive ? "text-primary" : "text-primary/75"
                                                }`}>
                                                0{i + 1}
                                            </span>
                                            <span className="text-lg leading-none text-primary">
                                                {link.label}
                                            </span>
                                        </span>
                                        <HiOutlineArrowLongRight className={`size-5 stroke-1 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                            }`} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="mt-auto pt-5 border-t border-primary/30 px-5">
                    <p className="flex items-center justify-center gap-2.5">
                        <span className="text-4xl font-light leading-none text-primary">
                            20
                        </span>
                        <span className="text-primary font-gentleman text-3xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                            años de montajes
                            <br />
                            nacional e internacional
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
