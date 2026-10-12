"use server"

import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

/**
 * Suma una vista al contador interno del articulo. La pagina publica sale del
 * Data Cache, asi que la cuenta no puede ir en el render: la dispara el
 * navegador una vez por sesion. No invalida ninguna cache a proposito.
 * Con la sesion del panel abierta no cuenta: revisar una entrada no es una lectura.
 */
export const registerBlogView = async (slug: string): Promise<void> => {
    if (await getToken()) return

    try {
        await fetch(`${process.env.API_URL}/blogs/${encodeURIComponent(slug)}/views`, {
            method: 'POST',
            headers: {
                ...originHeader()
            }
        })
    } catch {
        // Una vista perdida no debe romper la lectura del articulo.
    }
}
