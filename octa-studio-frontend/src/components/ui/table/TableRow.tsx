import { ReactNode } from 'react';

export const TableRow = ({ children }: { children: ReactNode }) => {
    return <tr className="border-secondary/30 border-b last:border-b-0">{children}</tr>;
};
