import { ReactNode } from 'react';

type TAdminHeadingProps = {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    narrow?: boolean;
};

export const AdminHeading = ({ title, subtitle, actions, narrow = false }: TAdminHeadingProps) => {
    const heading = (
        <div className="border-secondary-admin flex min-w-0 flex-col gap-1.5 border-l-4 pl-2.5 lg:pl-5">
            <h1 className="text-secondary-admin text-2xl lg:text-3xl leading-[1.15] font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm lg:text-base text-fourth-admin/75">{subtitle}</p>}
        </div>
    );

    if (!subtitle && !actions) {
        return <div className="mb-5">{heading}</div>;
    }

    return (
        <div className={`mb-5 flex w-full flex-col items-stretch gap-2.5 md:flex-row md:items-center md:justify-between md:gap-5 ${narrow ? 'mx-auto max-w-240' : ''}`}>
            {heading}

            {actions && <div className="flex shrink-0 flex-wrap items-center gap-1.5">{actions}</div>}
        </div>
    );
};
