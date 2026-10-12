import type { Metadata } from 'next';

import { AdminHeading } from '@/components/admin/layout/AdminHeading';
import { DashboardShell } from '@/components/admin/dashboard/home/DashboardShell';
import { DashboardNotices } from '@/components/admin/dashboard/home/DashboardNotices';
import { DashboardError } from '@/components/admin/dashboard/home/DashboardError';
import { GeneralAnalytics } from '@/components/admin/dashboard/home/GeneralAnalytics';
import { BlogStats } from '@/components/admin/dashboard/home/BlogStats';
import { BlogAnalytics } from '@/components/admin/dashboard/home/BlogAnalytics';
import { QuickActions } from '@/components/admin/dashboard/home/QuickActions';
import { DashboardPeriodSchema } from '@/schemas/enums.schemas';
import { getDashboardService } from '@/services/server/analytics.service';
import { getBlogStatsService } from '@/services/server/blog.service';
import { getProjectsCountService } from '@/services/server/project.service';

export const metadata: Metadata = { title: { absolute: 'Inicio | Panel · Octa Building Studio' } };

export default async function AdminHomePage({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period: rawPeriod } = await searchParams;

  // Un `?period=` desconocido cae en los ultimos 30 dias.
  const period = DashboardPeriodSchema.catch('30dias').parse(rawPeriod);

  // Si las analiticas fallan, el bloque interno del blog y las acciones siguen.
  const [dashboard, blogStats, projectsTotal] = await Promise.all([
    getDashboardService(period).catch(() => null),
    getBlogStatsService(),
    getProjectsCountService(),
  ]);

  return (
    <section>
      <AdminHeading title="Panel de Administración" />

      <DashboardShell period={period} notices={<DashboardNotices dashboard={dashboard} />}>
        {dashboard ? <GeneralAnalytics dashboard={dashboard} /> : <DashboardError />}

        <BlogStats stats={blogStats} />

        {dashboard && <BlogAnalytics blog={dashboard.blog} />}

        <QuickActions projectsTotal={projectsTotal} />
      </DashboardShell>
    </section>
  );
}
