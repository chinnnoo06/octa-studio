import { EditButton } from '@/components/ui/buttons/EditButton';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { ImageCell } from '@/components/ui/table/ImageCell';
import { TextCell } from '@/components/ui/table/TextCell';
import type { TBlog } from '@/schemas/blog/blog.schemas';
import { DeleteBlogButton } from './DeleteBlogButton';

const COLUMNS = ['Imagen', 'Título', 'Extracto', 'Categoría', 'Lectura', 'Acciones'] as const;

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
                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImageCell image={blog.image} name={blog.title} baseUrl={process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-secondary font-medium">{blog.title}</td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={blog.excerpt} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top whitespace-nowrap">{blog.category}</td>

                        <td className="p-5 text-sm lg:text-base align-top whitespace-nowrap">{blog.readingTime} min</td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/blogs/${blog._id}/imagen`}
                                    label={`Actualizar la imagen destacada de ${blog.title}`}
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
