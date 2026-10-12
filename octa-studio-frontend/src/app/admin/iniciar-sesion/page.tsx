import { LoginForm } from '@/components/admin/auth/LoginForm';
import { AdminHeading } from '@/components/admin/layout/AdminHeading';

export default function LoginPage() {
    return (
        <section className="w-full">
            <AdminHeading title="Iniciar sesión" subtitle="Ingresa tus credenciales para entrar al panel de administración." narrow />

            <LoginForm />
        </section>
    )
}
