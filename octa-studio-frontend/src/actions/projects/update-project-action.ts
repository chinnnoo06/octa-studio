"use server"

import { revalidatePath, updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { UpdateProjectFormSchema, TUpdateProjectForm } from "@/schemas/projects/projects.form.schemas"
import { TActionState } from "@/types/common.types"
import { originHeader } from "@/services/api.headers"
import { getToken } from "@/services/auth/auth.token"

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

    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...originHeader()
        },
        body: JSON.stringify({
            name: parsed.data.name,
            description: parsed.data.description,
            sector: parsed.data.sector,
            seo: parsed.data.seo
        })
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
