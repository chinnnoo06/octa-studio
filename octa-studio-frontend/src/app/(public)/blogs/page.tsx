import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/blogs/Hero';
import { Posts } from '@/components/blogs/Posts';

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Lo que aprendimos montando stands: presupuestos, renders, tiempos de recinto y logística de feria.',
  path: '/blogs',
});

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; categoria?: string }>;
}) {
  const { page, categoria } = await searchParams;

  return (
    <>
      <Hero />
      <Posts page={Number(page) || 1} category={categoria} />
    </>
  );
}
