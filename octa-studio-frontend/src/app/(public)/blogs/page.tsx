import type { Metadata } from 'next';
import { Posts } from '@/components/blogs/posts/Posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Lo que aprendimos montando stands: presupuestos, renders, tiempos de recinto y logística de feria.',
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <main className="pt-18">
      <Posts page={Number(page) || 1} />
    </main>
  );
}
