import { FaCircleInfo } from 'react-icons/fa6';

type TInfoTipProps = {
    text: string;
    /** Sobre fondo azul (KPI destacado) el icono va en blanco. */
    light?: boolean;
};

/**
 * Icono (i) con su explicacion. El globo aparece al pasar sobre el titulo que
 * lo contiene, que debe llevar `group/tip relative`.
 */
export const InfoTip = ({ text, light = false }: TInfoTipProps) => {
    return (
        <>
            <FaCircleInfo
                aria-hidden="true"
                className={`ml-1 inline-block size-3 cursor-help align-[-1px] ${light ? 'text-primary/70' : 'text-[#c2cad3]'}`}
            />
            <span
                role="tooltip"
                className="bg-tooltip text-primary pointer-events-none invisible absolute top-[calc(100%+6px)] left-0 z-30 w-62.5 max-w-[80vw] translate-y-1 rounded-[8px] px-3 py-2.5 text-[11.5px] leading-[1.45] font-normal tracking-normal normal-case opacity-0 shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition-all duration-150 group-hover/tip:visible group-hover/tip:translate-y-0 group-hover/tip:opacity-100 before:absolute before:bottom-full before:left-3.5 before:border-[6px] before:border-transparent before:border-b-tooltip before:content-['']"
            >
                {text}
            </span>
        </>
    );
};
