import { NextResponse } from 'next/server';
import { getToken } from '@/services/auth/auth.token';
import { getRealtimeUsersService } from '@/services/server/analytics.service';

/**
 * Puente para el contador "en linea ahora" del dashboard, que se refresca desde
 * el navegador cada pocos minutos. El navegador no puede leer la cookie httpOnly
 * ni hablar con el backend desde otro origen; este handler si.
 *
 * Es una URL publica: se comprueba la sesion antes de consultar.
 */
export async function GET() {
    const token = await getToken();

    if (!token) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const activeUsers = await getRealtimeUsersService();

        return NextResponse.json({ activeUsers });
    } catch {
        return NextResponse.json({ activeUsers: null });
    }
}
