"use server"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { originHeader } from "@/services/api.headers"
import { revalidatePath } from "next/cache"
import { TestimonialFormSchema, TTestimonialForm } from "@/schemas/testimonials/testimonials.form.schemas"
import { TActionState } from "@/types/common.types"
import { getToken } from "@/services/auth/auth.token"

export const createTestimonial = async (data: TTestimonialForm): Promise<TActionState | undefined> => {

    const parsed = TestimonialFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    if (!token) {
        return {
            error: "Tu sesión expiró, vuelve a iniciar sesión"
        }
    }

    const url = `${process.env.API_URL}/testimonials`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: JSON.stringify({
            quote: parsed.data.quote,
            name: parsed.data.name,
            rating: parsed.data.rating
        })
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