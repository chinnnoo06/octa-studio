import { ReactNode } from 'react';

type TTableCellProps = {
    children: ReactNode;
    className?: string;
    /** `select` = columna del checkbox; `actions` = botones alineados a la derecha. */
    variant?: 'default' | 'select' | 'image' | 'actions';
};

const VARIANT = {
    default: 'px-3.75 py-3.5',
    select: 'w-10 pr-0 pl-4 text-center',
    image: 'w-27.5 p-2.5 text-center',
    actions: 'py-3.5 pr-5 pl-3.75 text-right whitespace-nowrap',
} as const;

export const TableCell = ({ children, className, variant = 'default' }: TTableCellProps) => {
    return (
        <td className={`text-ink align-middle text-[13.5px] leading-[1.4] ${VARIANT[variant]} ${className ?? ''}`}>
            {children}
        </td>
    );
};
