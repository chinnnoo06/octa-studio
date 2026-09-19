"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateTestimonialFormSchema, TUpdateTestimonialForm } from "@/schemas/testimonials/testimonials.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const updateTestimonial = async (id: string, data: TUpdateTestimonialForm): Promise<TActionState> => {

    const parsed = UpdateTestimonialFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/testimonials/${id}`

    const req = await fetch(url, {
        method: 'PUT',
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

    // Tira el Data Cache de la web publica (home y listados), que cachea por tag.

    updateTag('testimonials')

    return {
        error: "",
        success: success.message
    }
}
