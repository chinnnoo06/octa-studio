import { FaComments, FaStar } from 'react-icons/fa6';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead, type TTableColumn } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableCell } from '@/components/ui/table/TableCell';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableCard, TableCardList } from '@/components/ui/table/TableCards';
import { ImageCell } from '@/components/ui/table/ImageCell';
import { TextCell } from '@/components/ui/table/TextCell';
import { BulkCheckbox, BulkSelectionProvider } from '@/components/ui/table/BulkSelection';
import type { TTestimonial } from '@/schemas/testimonial/testimonial.schemas';
import type { TAdminListParams } from '@/types/common.types';
import { formatShortDate } from '@/utils/formatDate';
import { DeleteTestimonialButton } from './DeleteTestimonialButton';
import { BulkDeleteTestimonials } from './BulkDeleteTestimonials';

const COLUMNS: TTableColumn[] = [
    { label: 'Imagen', align: 'center' },
    { label: 'Nombre', sortKey: 'name' },
    'Testimonio',
    { label: 'Valoración', sortKey: 'rating' },
    { label: 'Creado', sortKey: 'createdAt' },
    'Acciones',
];

const IMAGE_URL = process.env.NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL!;

type TTestimonialsTableProps = {
    testimonials: TTestimonial[];
    basePath: string;
    params: TAdminListParams;
    filtered: boolean;
};

const Rating = ({ rating }: { rating: number }) => (
    <span className="inline-flex items-center gap-0.75" aria-label={`${rating} de 5`}>
        {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} aria-hidden="true" className={`size-3.5 ${i < rating ? 'text-[#e8a200]' : 'text-slate-200'}`} />
        ))}
    </span>
);

const Actions = ({ testimonial }: { testimonial: TTestimonial }) => (
    <>
        <ImagesButton href={`/admin/testimonios/${testimonial._id}/imagen`} label={`Actualizar la imagen del testimonio de ${testimonial.name}`} />
        <EditButton href={`/admin/testimonios/${testimonial._id}/editar`} label={`Editar el testimonio de ${testimonial.name}`} />
        <DeleteTestimonialButton id={testimonial._id} name={testimonial.name} />
    </>
);

export const TestimonialsTable = ({ testimonials, basePath, params, filtered }: TTestimonialsTableProps) => {
    if (testimonials.length === 0) {
        return filtered ? (
            <TableEmpty title="Sin resultados" icon={FaComments}>Ningún testimonio coincide con la búsqueda o los filtros.</TableEmpty>
        ) : (
            <TableEmpty title="No hay testimonios" icon={FaComments}>Aún no hay testimonios. ¡Agrega el primero!</TableEmpty>
        );
    }

    return (
        <BulkSelectionProvider ids={testimonials.map((t) => t._id)}>
            <Table minWidth="min-w-200">
                <TableHead columns={COLUMNS} selectable sorting={{ basePath, params }} />

                <tbody>
                    {testimonials.map((t) => (
                        <TableRow key={t._id}>
                            <TableCell variant="select">
                                <BulkCheckbox id={t._id} label={`Seleccionar el testimonio de ${t.name}`} />
                            </TableCell>

                            <TableCell variant="image">
                                <ImageCell image={t.image} name={t.name} baseUrl={IMAGE_URL} />
                            </TableCell>

                            <TableCell className="whitespace-nowrap"><strong className="font-semibold">{t.name}</strong></TableCell>

                            <TableCell><TextCell text={t.quote} /></TableCell>

                            <TableCell><Rating rating={t.rating} /></TableCell>

                            <TableCell className="whitespace-nowrap">{t.createdAt ? formatShortDate(t.createdAt) : '—'}</TableCell>

                            <TableCell variant="actions">
                                <div className="inline-flex items-center justify-end gap-1">
                                    <Actions testimonial={t} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <TableCardList>
                {testimonials.map((t) => (
                    <TableCard
                        key={t._id}
                        id={t._id}
                        selectLabel={`Seleccionar el testimonio de ${t.name}`}
                        title={t.name}
                        media={<ImageCell image={t.image} name={t.name} baseUrl={IMAGE_URL} />}
                        extra={
                            <div className="flex flex-col gap-1.25">
                                <Rating rating={t.rating} />
                                <p className="line-clamp-2">{t.quote}</p>
                            </div>
                        }
                        date={t.createdAt ? formatShortDate(t.createdAt) : undefined}
                        actions={<Actions testimonial={t} />}
                    />
                ))}
            </TableCardList>

            <BulkDeleteTestimonials />
        </BulkSelectionProvider>
    );
};
