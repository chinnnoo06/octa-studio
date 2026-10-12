'use client';

import { Bar } from 'react-chartjs-2';
import { baseHBarOptions, rgba } from '@/utils/admin/chart';
import { formatDuration, formatNumber } from '@/utils/admin/formatMetrics';
import { ChartBox } from './ChartBox';

type THBarChartProps = {
    labels: string[];
    data: number[];
    color: string;
    /** Unidad del tooltip ("búsquedas", "clics"); `duration` formatea segundos. */
    unit: string;
    format?: 'number' | 'duration';
    emptyMessage: string;
};

/** Ranking en barras horizontales: tiempo por seccion, busquedas, clics. */
export const HBarChart = ({ labels, data, color, unit, format = 'number', emptyMessage }: THBarChartProps) => {
    const isDuration = format === 'duration';

    const options = baseHBarOptions(
        (value) => (isDuration ? formatDuration(value) : `${formatNumber(value)} ${unit}`),
        isDuration ? formatDuration : undefined,
    );

    return (
        <ChartBox empty={labels.length === 0 && emptyMessage}>
            <Bar
                options={options}
                data={{
                    labels,
                    datasets: [{
                        label: unit,
                        data,
                        backgroundColor: rgba(color, 0.75),
                        borderColor: color,
                        borderWidth: 1,
                        borderRadius: 4,
                    }],
                }}
            />
        </ChartBox>
    );
};
