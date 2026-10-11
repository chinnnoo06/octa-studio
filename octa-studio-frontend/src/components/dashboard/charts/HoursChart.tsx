'use client';

import { Bar } from 'react-chartjs-2';
import { CHART_COLORS, CHART_TOOLTIP, GRID_COLOR, rgba } from '@/utils/chart';
import { formatNumber, hasData } from '@/utils/formatMetrics';
import { ChartBox } from './ChartBox';

type THoursChartProps = {
    labels: string[];
    data: number[];
};

/** Sesiones por hora del dia, en la zona horaria del negocio. */
export const HoursChart = ({ labels, data }: THoursChartProps) => {
    return (
        <ChartBox empty={!hasData(data) && 'Sin datos de actividad por hora.'}>
            <Bar
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { ...CHART_TOOLTIP, callbacks: { label: (item) => ` ${formatNumber(item.parsed.y)} sesiones` } },
                    },
                    scales: {
                        x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 } },
                        y: { beginAtZero: true, grid: { color: GRID_COLOR }, ticks: { precision: 0 } },
                    },
                }}
                data={{
                    labels,
                    datasets: [{
                        label: 'Sesiones',
                        data,
                        backgroundColor: rgba(CHART_COLORS.blue, 0.7),
                        borderColor: CHART_COLORS.blue,
                        borderWidth: 1,
                        borderRadius: 3,
                    }],
                }}
            />
        </ChartBox>
    );
};
