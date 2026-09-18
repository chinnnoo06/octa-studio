"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { CreateBlogFormSchema, TCreateBlogForm } from "@/schemas/blogs/blogs.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const createBlog = async (data: TCreateBlogForm): Promise<TActionState> => {

    const parsed = CreateBlogFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/blogs`

    const formData = new FormData()

    formData.append("title", parsed.data.title)
    formData.append("excerpt", parsed.data.excerpt)
    formData.append("category", parsed.data.category)
    formData.append("readingTime", String(parsed.data.readingTime))

    // `content` ya es texto (HTML del editor) y viaja tal cual; solo `seo` es
    // un objeto y va serializado, que el backend reconstruye con `parseJsonFields(["seo"])`.
    formData.append("content", parsed.data.content)
    formData.append("seo", JSON.stringify(parsed.data.seo))

    // El nombre del campo es el que espera multer en `blogImage`: una sola destacada.
    formData.append("blogImage", parsed.data.image)

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            // Sin `Content-Type`: con un FormData lo pone fetch, que es el unico
            // que conoce el `boundary` del multipart.
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

    updateTag('blogs')

    return {
        error: "",
        success: success.message
    }
}
