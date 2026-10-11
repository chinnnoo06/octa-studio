"use server"

import { LoginFormSchema, TLoginForm } from "@/schemas/auth/login.form.schemas"
import { SuccessLoginResponseSchema } from "@/schemas/auth/login.response.schemas"
import { ErrorResponseSchema } from "@/schemas/common/common.response.schemas"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { originHeader } from "@/services/api.headers"
import { TActionState } from "@/types/common.types"

export const login = async (data: TLoginForm): Promise<TActionState | undefined> => {

    const parsed = LoginFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos"
        }
    }

    const url = `${process.env.API_URL}/auth/login`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...originHeader()
        },
        body: JSON.stringify({
            username: parsed.data.username,
            password: parsed.data.password
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { message } = ErrorResponseSchema.parse(json)

        return {
            error: message ?? "Error Desconocido"
        }
    }

    const success = SuccessLoginResponseSchema.parse(json)

    const cookieStore = await cookies()

    cookieStore.set("token", success.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24
    })

    redirect('/admin/blogs')
}