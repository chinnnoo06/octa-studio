import { ReactNode } from 'react';

export const TableEmpty = ({ children }: { children: ReactNode }) => {
    return (
        <p className="border-secondary/30 text-fourth/75 rounded-xl border px-5 py-10 text-center text-sm lg:text-base">
            {children}
        </p>
    );
};
