"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { CreateProjectFormSchema, TCreateProjectForm } from "@/schemas/projects/projects.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

export const createProject = async (data: TCreateProjectForm): Promise<TActionState> => {

    const parsed = CreateProjectFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const token = await getToken()


    const url = `${process.env.API_URL}/projects`

    const formData = new FormData()

    formData.append("name", parsed.data.name)
    formData.append("description", parsed.data.description)
    formData.append("sector", parsed.data.sector)

    formData.append("seo", JSON.stringify(parsed.data.seo))

    parsed.data.images.forEach((image) => {
        formData.append("projectImages", image)
    })

    const req = await fetch(url, {
        method: 'POST',
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
