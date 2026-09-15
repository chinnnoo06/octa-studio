import { ReactNode } from 'react';

type TTableProps = {
    children: ReactNode;
    minWidth?: string;
};

export const Table = ({ children, minWidth = 'min-w-150' }: TTableProps) => {
    return (
        <div className="border-secondary/30 overflow-x-auto rounded-xl border">
            <table className={`w-full ${minWidth} border-collapse text-left`}>{children}</table>
        </div>
    );
};
