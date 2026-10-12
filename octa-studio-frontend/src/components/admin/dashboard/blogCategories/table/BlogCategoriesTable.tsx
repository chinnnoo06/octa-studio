import { FaTags } from 'react-icons/fa6';
import { EditButton } from '@/components/admin/ui/buttons/EditButton';
import { Table } from '@/components/admin/ui/table/Table';
import { TableHead, type TTableColumn } from '@/components/admin/ui/table/TableHead';
import { TableRow } from '@/components/admin/ui/table/TableRow';
import { TableCell } from '@/components/admin/ui/table/TableCell';
import { TableEmpty } from '@/components/admin/ui/table/TableEmpty';
import { TableCard, TableCardList } from '@/components/admin/ui/table/TableCards';
import { BulkCheckbox, BulkSelectionProvider } from '@/components/admin/ui/table/BulkSelection';
import type { TBlogCategory } from '@/schemas/blogCategory/blogCategory.schemas';
import { DeleteBlogCategoryButton } from './DeleteBlogCategoryButton';
import { BulkDeleteBlogCategories } from './BulkDeleteBlogCategories';

const COLUMNS: TTableColumn[] = ['Nombre', 'Slug', 'Entradas', 'Acciones'];

const Slug = ({ slug }: { slug: string }) => (
    <code className="text-fourth-admin rounded-sm bg-thrird-admin px-1.5 py-0.5 text-xs lg:text-sm">{slug}</code>
);

const Actions = ({ category }: { category: TBlogCategory }) => (
    <>
        <EditButton href={`/admin/blog-categorias/${category._id}/editar`} label={`Editar la categoría ${category.name}`} />
        <DeleteBlogCategoryButton id={category._id} name={category.name} />
    </>
);

export const BlogCategoriesTable = ({ categories }: { categories: TBlogCategory[] }) => {
    if (categories.length === 0) {
        return <TableEmpty title="No hay categorías" icon={FaTags}>Aún no hay categorías de blog. ¡Crea la primera!</TableEmpty>;
    }

    return (
        <BulkSelectionProvider ids={categories.map((category) => category._id)}>
            <Table>
                <TableHead columns={COLUMNS} selectable />

                <tbody>
                    {categories.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell variant="select">
                                <BulkCheckbox id={category._id} label={`Seleccionar ${category.name}`} />
                            </TableCell>

                            <TableCell><strong className="font-semibold">{category.name}</strong></TableCell>

                            <TableCell><Slug slug={category.slug} /></TableCell>

                            <TableCell>{category.totalBlogs ?? 0}</TableCell>

                            <TableCell variant="actions">
                                <div className="inline-flex items-center justify-end gap-1.5">
                                    <Actions category={category} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <TableCardList>
                {categories.map((category) => (
                    <TableCard
                        key={category._id}
                        id={category._id}
                        selectLabel={`Seleccionar ${category.name}`}
                        title={category.name}
                        meta={[
                            { label: 'Slug', value: <Slug slug={category.slug} /> },
                            { label: 'Entradas', value: category.totalBlogs ?? 0 },
                        ]}
                        actions={<Actions category={category} />}
                    />
                ))}
            </TableCardList>

            <BulkDeleteBlogCategories />
        </BulkSelectionProvider>
    );
};
