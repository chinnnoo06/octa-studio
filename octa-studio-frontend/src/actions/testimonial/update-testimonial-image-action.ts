"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateTestimonialImageFormSchema, TUpdateTestimonialImageForm } from "@/schemas/testimonial/testimonial.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const updateTestimonialImage = async (id: string, data: TUpdateTestimonialImageForm): Promise<TActionState> => {

    const parsed = UpdateTestimonialImageFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/testimonials/${id}/image`

    const formData = new FormData()

    formData.append("testimonialImage", parsed.data.image)

    const req = await fetch(url, {
        method: 'PATCH',
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

    updateTag('testimonials')

    return {
        error: "",
        success: success.message
    }
}
