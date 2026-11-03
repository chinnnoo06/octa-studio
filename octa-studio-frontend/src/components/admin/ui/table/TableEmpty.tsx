import { HiInbox } from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import { ReactNode } from 'react';

type TTableEmptyProps = {
    title: string;
    children: ReactNode;
    icon?: IconType;
};

export const TableEmpty = ({ title, children, icon: Icon = HiInbox }: TTableEmptyProps) => {
    return (
        <div className="px-5 py-10 text-center md:bg-primary-admin md:rounded-xl md:py-15 md:border md:border-fourth-admin/30 md:shadow-lg">
            <Icon aria-hidden="true" className="mx-auto mb-5 size-10 text-fourth-admin/30" />
            <h3 className="text-fourth-admin mb-1.5 text-lg lg:text-xl font-semibold">{title}</h3>
            <p className="text-sm lg:text-base text-fourth-admin/75">{children}</p>
        </div>
    );
};
