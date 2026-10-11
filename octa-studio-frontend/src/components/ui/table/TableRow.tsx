import { ReactNode } from 'react';

/** Fila con hover suave; se tinta cuando su checkbox de seleccion masiva esta marcado. */
export const TableRow = ({ children }: { children: ReactNode }) => {
    return (
        <tr className="border-b border-slate-100 transition-colors duration-150 last:border-b-0 hover:bg-[#fafbfd] has-[.bulk-select:checked]:bg-secondary/6">
            {children}
        </tr>
    );
};
