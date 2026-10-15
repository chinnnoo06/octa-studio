"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateProjectFormSchema, TUpdateProjectForm } from "@/schemas/project/project.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

/** Edicion completa en una sola peticion: datos, SEO y archivos (multipart). */
export const updateProject = async (id: string, data: TUpdateProjectForm): Promise<TActionState> => {

    const parsed = UpdateProjectFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/projects/${id}`

    const formData = new FormData()

    formData.append("name", parsed.data.name)
    formData.append("description", parsed.data.description)
    formData.append("sector", parsed.data.sector)
    formData.append("seo", JSON.stringify(parsed.data.seo))

    // Los archivos actuales que se conservan; los que faltan, el backend los borra.
    formData.append("keepImages", JSON.stringify(parsed.data.keepImages))
    formData.append("keepVideos", JSON.stringify(parsed.data.keepVideos))

    parsed.data.images.forEach((image) => formData.append("projectImages", image))
    parsed.data.videos.forEach((video) => formData.append("projectVideos", video))

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
