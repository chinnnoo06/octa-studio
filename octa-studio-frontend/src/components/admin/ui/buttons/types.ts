export type TActionButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    variant?: 'solid' | 'outline';
    className?: string;
    onClick?: () => void;
}

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

export type TBackButtonProps = {
    label?: string;
    className?: string;
}

export type TPanelButtonProps = {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
    className?: string;
}
