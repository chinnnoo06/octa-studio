"use server"

import { revalidatePath } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { BlogImagesFormSchema, TBlogImagesForm } from "@/schemas/blogs/blogs.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const updateBlogImages = async (id: string, data: TBlogImagesForm): Promise<TActionState> => {

    const parsed = BlogImagesFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/blogs/${id}/images`

    const formData = new FormData()

    parsed.data.images.forEach((image) => {
        formData.append("blogImages", image)
    })

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

    revalidatePath('/admin/blogs')

    return {
        error: "",
        success: success.message
    }
}
