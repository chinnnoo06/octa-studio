'use client';

import { useEffect } from 'react';
import { LinkButton } from '@/components/ui/buttons/LinkButton';

type TErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: TErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center gap-5 px-5 lg:px-15 text-center">
      <p className="text-secondary/30 text-7xl leading-none font-bold lg:text-9xl">500</p>

      <h1 className="text-secondary text-2xl font-bold uppercase lg:text-3xl">
        Algo salió mal
      </h1>

      <p className="text-fourth/75 max-w-md text-base lg:text-lg">
        No pudimos cargar esta página. Suele ser algo momentáneo: vuelve a intentarlo en unos
        segundos o regresa al inicio.
      </p>

      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="border-secondary bg-secondary text-primary hover:bg-primary hover:text-secondary inline-flex cursor-pointer items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 lg:text-base"
        >
          Reintentar
        </button>

        <LinkButton href="/">Volver al inicio</LinkButton>
      </div>
    </main>
  );
}
