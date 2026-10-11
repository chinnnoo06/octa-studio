import { FaEye, FaNewspaper } from 'react-icons/fa6';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead, type TTableColumn } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableCell } from '@/components/ui/table/TableCell';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableCard, TableCardList } from '@/components/ui/table/TableCards';
import { ImageCell } from '@/components/ui/table/ImageCell';
import { StatusBadge } from '@/components/ui/table/StatusBadge';
import { BulkCheckbox, BulkSelectionProvider } from '@/components/ui/table/BulkSelection';
import type { TBlog } from '@/schemas/blog/blog.schemas';
import type { TAdminListParams } from '@/types/common.types';
import { BLOG_STATUS_LABELS } from '@/utils/data/blogs';
import { formatShortDate } from '@/utils/formatDate';
import { DeleteBlogButton } from './DeleteBlogButton';
import { BulkDeleteBlogs } from './BulkDeleteBlogs';

const COLUMNS: TTableColumn[] = [
    { label: 'Imagen', align: 'center' },
    { label: 'Título', sortKey: 'title' },
    { label: 'Categoría', sortKey: 'category' },
    { label: 'Estado', sortKey: 'status' },
    { label: 'Vistas', sortKey: 'views' },
    { label: 'Creado', sortKey: 'createdAt' },
    'Acciones',
];

const IMAGE_URL = process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL!;

type TBlogsTableProps = {
    blogs: TBlog[];
    basePath: string;
    params: TAdminListParams;
    /** Hay busqueda o filtros: el vacio dice "sin resultados", no "crea el primero". */
    filtered: boolean;
};

const StatusCell = ({ blog }: { blog: TBlog }) => (
    <StatusBadge tone={blog.status === 'published' ? 'success' : 'warning'}>
        {BLOG_STATUS_LABELS[blog.status]}
    </StatusBadge>
);

const Actions = ({ blog }: { blog: TBlog }) => (
    <>
        <ImagesButton href={`/admin/blogs/${blog._id}/imagen`} label={`Actualizar la imagen destacada de ${blog.title}`} />
        <EditButton href={`/admin/blogs/${blog._id}/editar`} label={`Editar el blog ${blog.title}`} />
        <DeleteBlogButton id={blog._id} name={blog.title} />
    </>
);

export const BlogsTable = ({ blogs, basePath, params, filtered }: TBlogsTableProps) => {
    if (blogs.length === 0) {
        return filtered ? (
            <TableEmpty title="Sin resultados" icon={FaNewspaper}>Ningún blog coincide con la búsqueda o los filtros.</TableEmpty>
        ) : (
            <TableEmpty title="No hay blogs" icon={FaNewspaper}>Aún no hay entradas de blog. ¡Crea la primera!</TableEmpty>
        );
    }

    return (
        <BulkSelectionProvider ids={blogs.map((blog) => blog._id)}>
            <Table minWidth="min-w-225">
                <TableHead columns={COLUMNS} selectable sorting={{ basePath, params }} />

                <tbody>
                    {blogs.map((blog) => (
                        <TableRow key={blog._id}>
                            <TableCell variant="select">
                                <BulkCheckbox id={blog._id} label={`Seleccionar ${blog.title}`} />
                            </TableCell>

                            <TableCell variant="image">
                                <ImageCell image={blog.image} name={blog.title} baseUrl={IMAGE_URL} />
                            </TableCell>

                            <TableCell><strong className="font-semibold">{blog.title}</strong></TableCell>

                            <TableCell>{blog.category}</TableCell>

                            <TableCell><StatusCell blog={blog} /></TableCell>

                            <TableCell className="whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.25">
                                    <FaEye aria-hidden="true" className="size-3.25 text-gray-600" />
                                    {blog.views.toLocaleString('es-MX')}
                                </span>
                            </TableCell>

                            <TableCell className="whitespace-nowrap">{formatShortDate(blog.createdAt)}</TableCell>

                            <TableCell variant="actions">
                                <div className="inline-flex items-center justify-end gap-1">
                                    <Actions blog={blog} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <TableCardList>
                {blogs.map((blog) => (
                    <TableCard
                        key={blog._id}
                        id={blog._id}
                        selectLabel={`Seleccionar ${blog.title}`}
                        title={blog.title}
                        media={<ImageCell image={blog.image} name={blog.title} baseUrl={IMAGE_URL} />}
                        meta={[
                            { label: 'Categoría', value: blog.category },
                            { label: 'Vistas', value: blog.views.toLocaleString('es-MX') },
                        ]}
                        extra={<StatusCell blog={blog} />}
                        date={formatShortDate(blog.createdAt)}
                        actions={<Actions blog={blog} />}
                    />
                ))}
            </TableCardList>

            <BulkDeleteBlogs />
        </BulkSelectionProvider>
    );
};
