import { ReactNode } from 'react';

type TTableProps = {
    children: ReactNode;
    minWidth?: string;
};

/** Tarjeta blanca con la tabla. En movil se oculta: ahi se pintan las tarjetas (`TableCards`). */
export const Table = ({ children, minWidth = 'min-w-150' }: TTableProps) => {
    return (
        <div className="bg-primary-admin hidden overflow-hidden rounded-[10px] border border-fourth-admin/30 shadow-lg md:block">
            <div className="w-full overflow-x-auto">
                <table className={`w-full ${minWidth} border-collapse text-left`}>{children}</table>
            </div>
        </div>
    );
};
