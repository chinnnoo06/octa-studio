/** Los que navegan: `LinkButton` y `LinkButtonLeft`, que son `<Link>`. */
export type TLinkButtonProps = {
    href: string;
    children: React.ReactNode;
}

/** El que ejecuta: `ActionButton`, que es un `<button>`. */
export type TActionButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    /** `solid` para la accion principal, `outline` para la secundaria. */
    variant?: 'solid' | 'outline';
    className?: string;
    /** Para usarlo fuera de un formulario, como en los modales. */
    onClick?: () => void;
}

/** Botones de accion de las tablas del panel. `label` es la etiqueta accesible
 *  completa ("Editar el testimonio de X"): sin ella todos se anuncian igual y
 *  no se sabe sobre que fila se actua. */
export type TEditButtonProps = {
    href: string;
    label: string;
    className?: string;
}

export type TDeleteButtonProps = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
    className?: string;
}

export type TImagesButtonProps = {
    href: string;
    label: string;
    className?: string;
}

export type TBackButtonProps = {
    label?: string;
    className?: string;
}
