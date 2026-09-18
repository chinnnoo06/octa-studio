import { NextResponse } from 'next/server';
import { originHeader } from '@/services/api.headers';
import { getToken } from '@/services/auth/auth.token';

/**
 * Puente para las imagenes que TinyMCE sube al insertarlas en un articulo.
 * Existe porque el editor corre en el navegador, que no puede leer la cookie
 * httpOnly del token ni hablar con el backend desde otro origen; este handler
 * si puede, y reenvia el multipart tal cual a `POST /blogs/content-images`.
 *
 * A diferencia de las actions, esto es una URL publica: cualquiera puede
 * llamarla, asi que aqui si se comprueba la sesion antes de reenviar.
 */
export async function POST(request: Request) {
    const token = await getToken();

    if (!token) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const formData = await request.formData();

    const res = await fetch(`${process.env.API_URL}/blogs/content-images`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            ...originHeader(),
        },
        body: formData,
    });

    const json = await res.json().catch(() => ({ message: 'Respuesta inesperada del servidor' }));

    return NextResponse.json(json, { status: res.status });
}
