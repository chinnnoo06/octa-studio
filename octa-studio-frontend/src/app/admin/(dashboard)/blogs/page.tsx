import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Pagination } from '@/components/ui/Pagination';
import { BlogsTable } from '@/components/blogs/table/BlogsTable';
import { getBlogsService } from '@/services/server/blogs.service';

const BASE_PATH = '/admin/blogs';

export const metadata: Metadata = { title: 'Blogs' };

export default async function AdminBlogsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { blogs, pagination } = await getBlogsService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Administra los blogs</Eyebrow>
          <SectionTitle lead="Nuestros" rotating="Blogs" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <LinkButtonLeft href={`${BASE_PATH}/crear`}>Crear blog</LinkButtonLeft>
        </div>

        <div className="flex xl:hidden">
          <LinkButton href={`${BASE_PATH}/crear`}>Crear blog</LinkButton>
        </div>
      </div>

      <BlogsTable blogs={blogs} />

      <Pagination pagination={pagination} basePath={BASE_PATH} />
    </section>
  );
}
