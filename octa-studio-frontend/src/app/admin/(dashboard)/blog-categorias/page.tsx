import type { Metadata } from 'next';
import { FaPlus } from 'react-icons/fa6';

import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { PanelButton } from '@/components/ui/buttons/PanelButton';
import { BlogCategoriesTable } from '@/components/blogCategories/table/BlogCategoriesTable';
import { getAdminBlogCategoriesService } from '@/services/server/blogCategory.service';

export const metadata: Metadata = { title: 'Categorías de Blog' };

export default async function AdminBlogCategoriasPage() {
  const categories = await getAdminBlogCategoriesService();

  return (
    <section>
      <AdminHeading title="Categorías de Blog" />

      {/* Sin buscador: son pocas y se listan en su orden. */}
      <div className="mb-5 flex md:justify-end">
        <PanelButton href="/admin/blog-categorias/crear">
          <FaPlus aria-hidden="true" className="size-3.5" />
          Nueva categoría
        </PanelButton>
      </div>

      <BlogCategoriesTable categories={categories} />
    </section>
  );
}
