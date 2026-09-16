import { FaStar } from 'react-icons/fa6';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import type { TTestiomonial } from '@/schemas/testimonials/testimonials.schemas';
import { DeleteTestimonialButton } from './DeleteTestimonialButton';
import { QuoteCell } from './QuoteCell';

const COLUMNS = ['Nombre', 'Testimonio', 'Valoración', 'Acciones'] as const;

export const TestimonialsTable = ({ testimonials }: { testimonials: TTestiomonial[] }) => {
    if (testimonials.length === 0) {
        return <TableEmpty>Todavía no hay testimonios. Agrega el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table>
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {testimonials.map((t) => (
                    <TableRow key={t._id}>
                        <td className={`px-5 py-4 text-sm lg:text-base align-top text-secondary font-medium`}>{t.name}</td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top">
                            <QuoteCell quote={t.quote} />
                        </td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top">
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

                        <td className={`px-5 py-4 text-sm lg:text-base align-top text-right whitespace-nowrap`}>
                            <span className="inline-flex items-center gap-2.5">
                                <EditButton
                                    href={`/admin/testimonios/${t._id}/editar`}
                                    label={`Editar el testimonio de ${t.name}`}
                                />

                                <DeleteTestimonialButton id={t._id} name={t.name} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};
