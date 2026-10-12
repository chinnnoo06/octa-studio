import { ADMIN_LOGOUT } from '@/utils/data/admin';
import { logout } from '@/actions/auth/logout.action';

type TLogoutButtonProps = {
    className: string;
    iconClassName?: string;
    labelClassName?: string;
    showIcon?: boolean;
};

export const LogoutButton = ({ className, iconClassName, labelClassName, showIcon = true }: TLogoutButtonProps) => {
    const LogoutIcon = ADMIN_LOGOUT.icon;

    const handleLogout = async () => {
        await logout();
    }

    return (
        <button type="button" onClick={handleLogout} className={`cursor-pointer ${className}`}>
            {showIcon && <LogoutIcon aria-hidden="true" className={`shrink-0 ${iconClassName ?? ''}`} />}
            <span className={labelClassName}>{ADMIN_LOGOUT.label}</span>
        </button>
    );
};
