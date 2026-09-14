export type TButtonProps = {
    href: string;
    children: React.ReactNode;
}

export type TSecondaryButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    className?: string;
    /** Para usarlos fuera de un formulario, como en los modales. */
    onClick?: () => void;
}