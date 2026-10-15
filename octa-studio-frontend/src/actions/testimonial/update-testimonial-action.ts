"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateTestimonialFormSchema, TUpdateTestimonialForm } from "@/schemas/testimonial/testimonial.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

/** Edicion completa en una sola peticion: datos, SEO y archivos (multipart). */
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

    const formData = new FormData()

    formData.append("quote", parsed.data.quote)
    formData.append("name", parsed.data.name)
    formData.append("rating", String(parsed.data.rating))

    // Sin logo nuevo, el backend conserva el actual.
    if (parsed.data.image) formData.append("testimonialImage", parsed.data.image)

    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: formData
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
