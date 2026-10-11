import { FaStar } from 'react-icons/fa6';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { ImageCell } from '@/components/ui/table/ImageCell';
import { TextCell } from '@/components/ui/table/TextCell';
import type { TTestimonial } from '@/schemas/testimonial/testimonial.schemas';
import { DeleteTestimonialButton } from './DeleteTestimonialButton';

const COLUMNS = ['Imagen', 'Nombre', 'Testimonio', 'Valoración', 'Acciones'] as const;

export const TestimonialsTable = ({ testimonials }: { testimonials: TTestimonial[] }) => {
    if (testimonials.length === 0) {
        return <TableEmpty>Todavía no hay testimonios. Agrega el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-200">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {testimonials.map((t) => (
                    <TableRow key={t._id}>
                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImageCell image={t.image} name={t.name} baseUrl={process.env.NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-secondary font-medium whitespace-nowrap">{t.name}</td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={t.quote} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <span className="inline-flex items-center gap-1.5" aria-label={`${t.rating} de 5`}>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        aria-hidden="true"
                                        className={`size-4 lg:size-4.5 ${i < t.rating ? 'text-secondary' : 'text-secondary/25'}`}
                                    />
                                ))}
                            </span>
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/testimonios/${t._id}/imagen`}
                                    label={`Actualizar la imagen del testimonio de ${t.name}`}
                                />

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
