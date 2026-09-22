"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { ProjectVideosFormSchema, TProjectVideosForm } from "@/schemas/projects/projects.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const updateProjectVideos = async (id: string, data: TProjectVideosForm): Promise<TActionState> => {

    const parsed = ProjectVideosFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/projects/${id}/videos`

    const formData = new FormData()

    // El nombre del campo es el que espera multer en `projectVideos`. Sin
    // archivos, el backend deja el proyecto sin videos.
    parsed.data.videos.forEach((video) => {
        formData.append("projectVideos", video)
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

    revalidatePath('/admin/proyectos')

    // Tira el Data Cache de la web publica (home y listados), que cachea por tag.

    updateTag('projects')

    return {
        error: "",
        success: success.message
    }
}
