"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"

import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

/** Borrado masivo desde la barra flotante; las entradas quedan "Sin categoría". */
export const deleteBlogCategories = async (ids: string[]): Promise<TActionState> => {
    if (ids.length === 0) {
        return {
            error: "No hay elementos seleccionados",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/blog-categories/bulk-delete`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: JSON.stringify({ ids })
    })

    const json = await req.json()

    if (!req.ok) {
        const { message } = ErrorResponseSchema.parse(json)

        return {
            error: message ?? "Error Desconocido",
            success: ""
        }
    }

    const success = SuccessResponseSchema.parse(json)

    revalidatePath('/admin/blog-categorias')

    // Las categorias se ven en el filtro del blog y en cada entrada: se tiran ambos tags.

    updateTag('blog-categories')
    updateTag('blogs')

    return {
        error: "",
        success: success.message
    }
}
