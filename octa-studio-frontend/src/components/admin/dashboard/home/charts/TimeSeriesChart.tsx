'use client';

import { Line } from 'react-chartjs-2';
import { baseLineOptions, verticalGradient } from '@/utils/admin/chart';
import { hasData } from '@/utils/admin/formatMetrics';
import { ChartBox } from './ChartBox';

export type TSeries = {
    label: string;
    data: number[];
    color: string;
    /** Serie principal: relleno degradado y linea gruesa. */
    fill?: boolean;
    dashed?: boolean;
};

type TTimeSeriesChartProps = {
    labels: string[];
    series: TSeries[];
    emptyMessage: string;
    height?: number;
};

/** Lineas en el tiempo (sesiones/usuarios, conversiones, vistas del blog). */
export const TimeSeriesChart = ({ labels, series, emptyMessage, height = 300 }: TTimeSeriesChartProps) => {
    const dense = labels.length > 40;

    return (
        <ChartBox height={height} empty={!hasData(...series.map((s) => s.data)) && emptyMessage}>
            <Line
                options={baseLineOptions()}
                data={{
                    labels,
                    datasets: series.map((s) => ({
                        label: s.label,
                        data: s.data,
                        borderColor: s.color,
                        backgroundColor: s.fill ? verticalGradient(s.color) : 'transparent',
                        fill: Boolean(s.fill),
                        tension: 0.35,
                        borderWidth: s.fill ? 3 : 2,
                        borderDash: s.dashed ? [5, 4] : undefined,
                        pointRadius: s.dashed || dense ? 0 : 3,
                        pointBackgroundColor: s.color,
                    })),
                }}
            />
        </ChartBox>
    );
};
