import { EditButton } from '@/components/ui/buttons/EditButton';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import type { TBlog } from '@/schemas/blogs/blogs.schemas';
import { BlogImages } from './BlogImages';
import { DeleteBlogButton } from './DeleteBlogButton';
import { ExcerptCell } from './ExcerptCell';

const COLUMNS = ['Imágenes', 'Título', 'Extracto', 'Categoría', 'Lectura', 'Acciones'] as const;

export const BlogsTable = ({ blogs }: { blogs: TBlog[] }) => {
    if (blogs.length === 0) {
        return <TableEmpty>Todavía no hay blogs. Crea el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-200">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {blogs.map((blog) => (
                    <TableRow key={blog._id}>
                        <td className="px-5 py-4 text-sm lg:text-base align-top">
                            <BlogImages images={blog.images} name={blog.title} />
                        </td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top text-secondary font-medium">{blog.title}</td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top">
                            <ExcerptCell excerpt={blog.excerpt} />
                        </td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top whitespace-nowrap">{blog.category}</td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top whitespace-nowrap">{blog.readingTime} min</td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/blogs/${blog._id}/imagenes`}
                                    label={`Actualizar las imágenes de ${blog.title}`}
                                />

                                <EditButton
                                    href={`/admin/blogs/${blog._id}/editar`}
                                    label={`Editar el blog ${blog.title}`}
                                />

                                <DeleteBlogButton id={blog._id} name={blog.title} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};
