import { ReactNode } from 'react';

/** Fila con hover suave; se tinta cuando su checkbox de seleccion masiva esta marcado. */
export const TableRow = ({ children }: { children: ReactNode }) => {
    return (
        <tr className="border-b border-fourth-admin/30 transition-colors duration-150 last:border-b-0 hover:bg-thrird-admin/50 has-[.bulk-select:checked]:bg-secondary-admin/6">
            {children}
        </tr>
    );
};
