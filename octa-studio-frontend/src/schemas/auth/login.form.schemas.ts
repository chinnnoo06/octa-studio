import { z } from "zod"

// trim antes de validar: un espacio de más al copiar y pegar hacía fallar el login
export const LoginFormSchema = z.object({
    username: z.string().trim().min(1, { message: 'Campo obligatorio' }),
    password: z.string().trim().min(1, { message: 'Campo obligatorio' })
})

export type TLoginForm = z.infer<typeof LoginFormSchema>
