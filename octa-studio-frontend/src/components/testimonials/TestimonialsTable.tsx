import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import type { TTestiomonial } from '@/schemas/testimonials/testimonials.schemas';
import { DeleteTestimonialButton } from './DeleteTestimonialButton';
import { QuoteCell } from './QuoteCell';

const CELL = 'px-5 py-4 text-sm lg:text-base align-top';

export const TestimonialsTable = ({ testimonials }: { testimonials: TTestiomonial[] }) => {
    if (testimonials.length === 0) {
        return (
            <p className="border-secondary/30 text-fourth/75 rounded-xl border px-5 py-10 text-center text-sm lg:text-base">
                Todavía no hay testimonios. Agrega el primero desde el botón de arriba.
            </p>
        );
    }

    return (
   
        <div className="border-secondary/30 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-150 border-collapse text-left">
                <thead className="border-secondary/30 text-secondary border-b text-xs uppercase">
                    <tr>
                        <th scope="col" className={CELL}>Nombre</th>
                        <th scope="col" className={CELL}>Testimonio</th>
                        <th scope="col" className={CELL}>Valoración</th>
                        <th scope="col" className={`${CELL} text-right`}>Acciones</th>
                    </tr>
                </thead>

                <tbody className="text-fourth/75">
                    {testimonials.map((t) => (
                        <tr key={t._id} className="border-secondary/30 border-b last:border-b-0">
                            <td className={`${CELL} text-secondary font-medium`}>{t.name}</td>

                            <td className={CELL}>
                                <QuoteCell quote={t.quote} />
                            </td>

                            <td className={CELL}>
                                <span className="inline-flex items-center gap-1" aria-label={`${t.rating} de 5`}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            aria-hidden="true"
                                            className={`size-3.5 ${i < t.rating ? 'text-secondary' : 'text-secondary/25'}`}
                                        />
                                    ))}
                                </span>
                            </td>

                            <td className={`${CELL} text-right whitespace-nowrap`}>
                                <span className="inline-flex items-center gap-2.5">
                                    <Link
                                        href={`/admin/testimonios/${t._id}/editar`}
                                        aria-label={`Editar el testimonio de ${t.name}`}
                                        className="text-fourth/75 hover:bg-secondary/15 hover:text-secondary inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-300"
                                    >
                                        <FiEdit2 aria-hidden="true" className="size-4.5" />
                                    </Link>

                                    <DeleteTestimonialButton id={t._id} name={t.name} />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
