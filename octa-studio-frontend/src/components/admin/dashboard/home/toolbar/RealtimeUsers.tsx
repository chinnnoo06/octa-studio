'use client';

import { useEffect, useState } from 'react';

const REFRESH = 3 * 60 * 1000;

/**
 * "N en linea ahora" (GA4 en tiempo real). Se refresca cada 3 minutos solo con
 * la pestaña visible; si GA no responde se queda en "—" y deja de preguntar.
 */
export const RealtimeUsers = () => {
    const [users, setUsers] = useState<string>('…');

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        let stopped = false;

        const stop = () => {
            if (interval) clearInterval(interval);
            interval = null;
        };

        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/admin/realtime', { cache: 'no-store' });
                const json = res.ok ? await res.json() as { activeUsers: number | null } : null;

                if (json?.activeUsers === null || json === null) {
                    setUsers('—');
                    stopped = true;
                    stop();
                    return;
                }

                setUsers(String(json.activeUsers));
            } catch {
                setUsers('—');
                stopped = true;
                stop();
            }
        };

        const onVisibility = () => {
            if (stopped) return;
            if (document.hidden) return stop();

            fetchUsers();
            interval ??= setInterval(fetchUsers, REFRESH);
        };

        document.addEventListener('visibilitychange', onVisibility);
        onVisibility();

        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
            stop();
        };
    }, []);

    return (
        <span className="inline-flex items-center gap-1.5 text-sm lg:text-base text-fourth-admin/75">
            <span aria-hidden="true" className="rt-dot size-2.5 rounded-full bg-[#2ecc71]" />
            <strong className="text-fourth-admin text-base lg:text-lg">{users}</strong> en línea ahora
        </span>
    );
};
