import { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { FaInbox } from 'react-icons/fa6';

type TTableEmptyProps = {
    title: string;
    children: ReactNode;
    icon?: IconType;
};

export const TableEmpty = ({ title, children, icon: Icon = FaInbox }: TTableEmptyProps) => {
    return (
        <div className="px-3.75 py-10 text-center md:bg-primary md:rounded-[10px] md:px-5 md:py-15 md:shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
            <Icon aria-hidden="true" className="mx-auto mb-3.75 size-10 text-slate-300" />
            <h3 className="text-ink mb-1.25 text-[18px] font-semibold">{title}</h3>
            <p className="text-[14px] text-gray-600">{children}</p>
        </div>
    );
};
