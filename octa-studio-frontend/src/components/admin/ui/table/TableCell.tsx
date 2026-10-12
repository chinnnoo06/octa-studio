import { ReactNode } from 'react';

type TTableCellProps = {
    children: ReactNode;
    className?: string;
    /** `select` = columna del checkbox; `actions` = botones alineados a la derecha. */
    variant?: 'default' | 'select' | 'image' | 'actions';
};

const VARIANT = {
    default: 'px-5 py-2.5',
    select: 'w-10 pr-0 pl-5 text-center',
    image: 'w-27.5 p-2.5 text-center',
    actions: 'py-2.5 pr-5 pl-5 text-right whitespace-nowrap',
} as const;

export const TableCell = ({ children, className, variant = 'default' }: TTableCellProps) => {
    return (
        <td className={`text-fourth-admin align-middle text-xs lg:text-sm leading-[1.4] ${VARIANT[variant]} ${className ?? ''}`}>
            {children}
        </td>
    );
};
