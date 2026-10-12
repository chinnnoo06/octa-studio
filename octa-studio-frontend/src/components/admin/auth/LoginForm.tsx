"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash, FaRightToBracket } from 'react-icons/fa6';

import { LoginFormSchema, TLoginForm } from '@/schemas/auth/login.form.schemas';
import { toast } from "react-toastify";
import { ActionButton } from "@/components/admin/ui/buttons/ActionButton";
import { Label } from "@/components/admin/ui/form/Label";
import { Input } from "@/components/admin/ui/form/Input";
import { SpanError } from "@/components/admin/ui/form/SpanError";
import { FormSection } from "@/components/admin/ui/form/FormSection";
import { FormSectionTitle } from "@/components/admin/ui/form/FormSectionTitle";
import { useActionStatus } from "@/hooks/ui/useActionStatus";
import { usePasswordVisibility } from "@/hooks/ui/usePasswordVisibility";
import { login } from "@/actions/auth/login.action";

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginFormSchema)
    })

    const { loading, startLoading, stopLoading } = useActionStatus()
    const { showPassword, handlePasswordVisibility, inputTypePassword } = usePasswordVisibility()

    const onSubmit = async (data: TLoginForm) => {
        startLoading()
        const res = await login(data)
        stopLoading()

        if (res?.error) toast.error(res.error)
    }

    return (
        <form className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSection>
                <FormSectionTitle>Credenciales</FormSectionTitle>

            <div className="form-group">
                <Label htmlFor="username">Usuario</Label>

                <Input
                    type="text"
                    id="username"
                    autoComplete="username"
                    placeholder="Escribe tu usuario"
                    {...register("username")}
                />

                <SpanError message={errors.username?.message} />
            </div>

            <div className="form-group">
                <Label htmlFor="password">Contraseña</Label>

                <div className="relative">
                    <Input
                        type={inputTypePassword}
                        id="password"
                        autoComplete="current-password"
                        placeholder="Escribe tu contraseña"
                        className="pr-10"
                        {...register("password")}
                    />

                    <button
                        type="button"
                        onClick={handlePasswordVisibility}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-secondary-admin/75 hover:text-secondary-admin"
                    >
                        {showPassword
                            ? <FaEyeSlash className="size-4 lg:size-4.5" aria-hidden="true" />
                            : <FaEye className="size-4 lg:size-4.5" aria-hidden="true" />
                        }
                    </button>
                </div>

                <SpanError message={errors.password?.message} />
            </div>
            </FormSection>


            <ActionButton loading={loading}>
                <FaRightToBracket aria-hidden="true" className="size-4 lg:size-4.5" />
                {loading ? 'Entrando...' : 'Entrar'}
            </ActionButton>
        </form>
    )
}
