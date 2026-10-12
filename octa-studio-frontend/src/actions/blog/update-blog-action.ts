"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateBlogFormSchema, TUpdateBlogForm } from "@/schemas/blog/blog.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

/** Edicion completa en una sola peticion: datos, SEO y archivos (multipart). */
export const updateBlog = async (id: string, data: TUpdateBlogForm): Promise<TActionState> => {

    const parsed = UpdateBlogFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/blogs/${id}`

    const formData = new FormData()

    formData.append("title", parsed.data.title)
    formData.append("excerpt", parsed.data.excerpt)
    formData.append("category", parsed.data.category)
    formData.append("status", parsed.data.status)
    formData.append("content", parsed.data.content)
    formData.append("seo", JSON.stringify(parsed.data.seo))

    // Sin imagen nueva, el backend conserva la actual.
    if (parsed.data.image) formData.append("blogImage", parsed.data.image)

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

    // Tira el Data Cache de la web publica (home y listados), que cachea por tag.

    updateTag('blog/update-blog-action.ts0')

    return {
        error: "",
        success: success.message
    }
}
