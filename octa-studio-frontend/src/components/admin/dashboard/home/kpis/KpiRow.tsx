import { ReactNode } from 'react';

type TKpiRowProps = {
    children: ReactNode;
    /** Columnas en escritorio: 6 en las metricas generales, 4 en el bloque del blog. */
    columns?: 4 | 6;
};

const DESKTOP = { 4: 'xl:grid-cols-4', 6: 'xl:grid-cols-6' } as const;

export const KpiRow = ({ children, columns = 6 }: TKpiRowProps) => {
    return (
        <div className={`col-span-full grid grid-cols-2 gap-5 md:grid-cols-3 ${DESKTOP[columns]}`}>
            {children}
        </div>
    );
};
