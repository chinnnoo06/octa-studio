import { LoginForm } from '@/components/auth/LoginForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function LoginPage() {
    return (
        <section className='max-w-4xl mx-auto px-4 py-25 lg:py-30'>
            <div className="text-secondary flex flex-col mb-10 gap-2.5">
                <Eyebrow>Panel de administrador</Eyebrow>
                <div className='space-y-2.5'>
                    <SectionTitle lead="Iniciar" rotating="Sesión" as='h1'/>
                    <p className="text-fourth/75 text-base lg:text-lg ">
                        Ingresa tus credenciales correctamente para poder iniciar sesión
                    </p>
                </div>
            </div>

            <LoginForm />
        </section>
    )
}
