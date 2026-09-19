import { LEGAL_LINKS } from '@/utils/data/navigation'
import Link from 'next/link'
import { DEVELOPER } from '@/utils/data/credits'

export const FooterBottomBar = () => {
    return (
        <div className="border-primary/30 flex flex-col items-center gap-5 border-t pt-10 sm:flex-row sm:justify-between">
            <p className="text-primary/75 text-xs lg:text-sm text-center">
                © {new Date().getFullYear()} Octa Building Studio · Powered by {' '}
                {DEVELOPER.url ? (
                    <a
                        href={DEVELOPER.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors duration-300"
                    >
                        {DEVELOPER.name}
                    </a>
                ) : (
                    DEVELOPER.name
                )}
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs lg:text-sm">
                {LEGAL_LINKS.map((l) => (
                    <li key={l.href}>
                        <Link
                            href={l.href}
                            className="text-primary/75 hover:text-primary transition-colors duration-300"
                        >
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
