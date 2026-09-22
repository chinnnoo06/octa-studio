import { ADMIN_LOGOUT } from '@/utils/data/navigation';
import { logout } from '@/actions/logout.action';

export const LogoutButton = ({ className }: { className: string }) => {
    const LogoutIcon = ADMIN_LOGOUT.icon;

    const handleLogout = async () => {
        await logout();
    }

    return (
        <button onClick={handleLogout} className={`${className} w-full cursor-pointer text-red-600 border-t border-secondary/30`}>
            <LogoutIcon aria-hidden="true" className="size-4.5 shrink-0" />
            {ADMIN_LOGOUT.label}
        </button>
    );
};
