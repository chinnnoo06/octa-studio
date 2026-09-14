import Link from 'next/link';
import { Logo } from '../Logo';

export const SimpleHeader = () => {
    return (
        <>
            <header className='fixed top-0 inset-x-0 z-100 bg-secondary backdrop-blur-md border-b transition-colors duration-300 border-primary/30'
            >

                <div className="relative max-w-[1700px] mx-auto flex justify-center items-center w-full px-5 lg:px-15 h-18 gap-10">

                    <div className="flex items-center justify-start shrink-0">
                        <div className="w-18 xl:w-23 shrink-0 transition-transform duration-300 hover:scale-[1.03]">
                            <Link href="/" className="no-underline" aria-label="Ir al inicio">
                                <Logo sizes="(min-width: 1280px) 92px, 72px" />
                            </Link>
                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}
