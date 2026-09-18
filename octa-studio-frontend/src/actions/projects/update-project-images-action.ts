"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { ProjectImagesFormSchema, TProjectImagesForm } from "@/schemas/projects/projects.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const updateProjectImages = async (id: string, data: TProjectImagesForm): Promise<TActionState> => {

    const parsed = ProjectImagesFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/projects/${id}/images`

    const formData = new FormData()

    // El nombre del campo es el que espera multer en `projectImages`.
    parsed.data.images.forEach((image) => {
        formData.append("projectImages", image)
    })

    const req = await fetch(url, {
        method: 'PATCH',
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

    revalidatePath('/admin/proyectos')

    // Tira el Data Cache de la web publica (home y listados), que cachea por tag.

    updateTag('projects')

    return {
        error: "",
        success: success.message
    }
}
