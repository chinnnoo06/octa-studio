import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
};

// Pendiente de redactar. La ruta existe para que el enlace del footer no de 404.
export default function TerminosPage() {
  return (
    <main className="pt-18">
      <div className="mx-auto max-w-[1700px] px-5 lg:px-15 py-20 lg:py-25">
        <h1 className="text-secondary text-4xl font-bold uppercase lg:text-5xl">Términos y condiciones</h1>
      </div>
    </main>
  );
}
