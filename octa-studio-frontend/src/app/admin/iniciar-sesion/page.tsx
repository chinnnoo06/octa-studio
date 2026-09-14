import { LoginForm } from '@/components/auth/LoginForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function LoginPage() {
    return (
        <section className='max-w-3xl mx-auto px-4 py-25 lg:py-30'>
            <div className="text-secondary flex flex-col gap-5 mb-10">
                <Eyebrow>Panel de administrador</Eyebrow>
                <div className='space-y-2.5'>
                    <SectionTitle lead="Iniciar" rotating="Sesión" />
                    <p className="text-fourth/75 text-base lg:text-lg ">
                        Ingresa tus credenciales correctamente para poder iniciar sesión
                    </p>
                </div>
            </div>

            <LoginForm />
        </section>
    )
}
