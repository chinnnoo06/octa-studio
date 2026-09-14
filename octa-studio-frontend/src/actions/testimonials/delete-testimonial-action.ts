"use server"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { originHeader } from "@/services/api.headers"
import { revalidatePath } from "next/cache"
import { TActionState } from "@/types/common.types"
import { getToken } from "@/services/auth/auth.token"

export const deleteTestimonial = async (id: string): Promise<TActionState | undefined> => {

    const token = await getToken()

    if (!token) {
        return {
            error: "Tu sesión expiró, vuelve a iniciar sesión"
        }
    }

    const url = `${process.env.API_URL}/testimonials/${id}`

    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        }
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

    revalidatePath('/admin/testimonios')

    return {
        error: "",
        success: success.message
    }
}