import { ReactNode } from 'react';

type TChartBoxProps = {
    children: ReactNode;
    /** Alto del lienzo en px; Chart.js llena el contenedor. */
    height?: number;
    /** Si no hay datos, en lugar de la grafica va este mensaje. */
    empty?: string | false;
};

/** Contenedor de cada grafica, con el estado vacio punteado del dashboard. */
export const ChartBox = ({ children, height = 300, empty = false }: TChartBoxProps) => {
    return (
        <div className="relative w-full" style={{ height }}>
            {empty ? (
                <p className="m-0 flex h-full min-h-40 items-center justify-center rounded-[8px] border-2 border-dashed border-[#e3e7eb] p-5 text-center text-[13px] text-gray-600">
                    {empty}
                </p>
            ) : (
                children
            )}
        </div>
    );
};
