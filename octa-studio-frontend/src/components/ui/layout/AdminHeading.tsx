import { ReactNode } from 'react';

type TAdminHeadingProps = {
    title: string;
    /** Texto de apoyo bajo el titulo (paginas de crear/editar). */
    subtitle?: string;
    /** Botones a la derecha, p. ej. "Volver". */
    actions?: ReactNode;
    /** Ancho del formulario al que acompaña; los listados ocupan todo. */
    narrow?: boolean;
};

/** Titulo de cada pagina del panel. */
export const AdminHeading = ({ title, subtitle, actions, narrow = false }: TAdminHeadingProps) => {
    if (!subtitle && !actions) {
        return <h1 className="text-ink mb-5 text-[22px] leading-[1.2] font-semibold md:mb-6.25 md:text-[26px]">{title}</h1>;
    }

    return (
        <div className={`mb-5 flex w-full flex-col items-stretch gap-2.5 md:mb-6.25 md:flex-row md:items-center md:justify-between md:gap-3.75 ${narrow ? 'mx-auto max-w-240' : ''}`}>
            <div className="flex min-w-0 flex-col gap-1">
                <h1 className="text-ink text-[20px] leading-[1.2] font-semibold md:text-[24px]">{title}</h1>
                {subtitle && <p className="text-[13px] text-gray-600">{subtitle}</p>}
            </div>

            {actions && <div className="flex shrink-0 flex-wrap items-center gap-1.75">{actions}</div>}
        </div>
    );
};
