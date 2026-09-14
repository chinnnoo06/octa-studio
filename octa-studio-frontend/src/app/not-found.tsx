import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-5 lg:px-15 pt-18 text-center">
      <p className="text-secondary/30 text-7xl leading-none font-bold lg:text-9xl">404</p>

      <h1 className="text-secondary text-2xl font-bold uppercase lg:text-3xl">
        Esta página no existe
      </h1>

      <p className="text-fourth/75 max-w-md text-base lg:text-lg">
        Puede que la hayamos movido de sitio o que todavía esté en construcción. Desde el inicio
        llegas a todo lo demás.
      </p>

      <PrimaryButton href="/">Volver al inicio</PrimaryButton>
    </main>
  );
}
