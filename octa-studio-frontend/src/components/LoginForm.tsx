"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash, FaRightToBracket } from 'react-icons/fa6';

import { LoginFormSchema, TLoginForm } from '@/schemas/auth/login.form.schemas';
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { useActionStatus } from "@/hooks/ui/useActionStatus";
import { usePasswordVisibility } from "@/hooks/ui/usePasswordVisibility";
import { login } from "@/actions/login.action";

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
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        className="pr-11"
                        {...register("password")}
                    />

                    <button
                        type="button"
                        onClick={handlePasswordVisibility}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-secondary/75 hover:text-secondary"
                    >
                        {showPassword
                            ? <FaEyeSlash className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                            : <FaEye className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                        }
                    </button>
                </div>

                <SpanError message={errors.password?.message} />
            </div>
            </FormSection>


            <ActionButton loading={loading} className="w-full">
                <FaRightToBracket aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {loading ? 'Entrando...' : 'Entrar'}
            </ActionButton>
        </form>
    )
}
