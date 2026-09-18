"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateBlogFormSchema, TUpdateBlogForm } from "@/schemas/blogs/blogs.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

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

    // Aqui si va JSON, al contrario que en el alta: el `PATCH /blogs/:id` no
    // lleva multer, asi que `content` y `seo` viajan como estructuras de verdad
    // y no como cadenas. Las imagenes tienen su propia ruta.
    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: JSON.stringify(parsed.data)
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
