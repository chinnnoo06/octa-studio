import { pageMetadata } from '@/utils/metadata';
import { LegalPage } from '@/components/legal/LegalPage';
import { LegalBlock } from '@/components/legal/LegalBlock';
import { DEVELOPER, IMAGE_CREDITS, MAGNIFIC_ATTRIBUTION } from '@/utils/data/credits';

export const metadata = pageMetadata({
  title: 'Créditos',
  description:
    'Autoría de las imágenes de terceros y de las generadas con herramientas usadas en el sitio de Octa Building Studio.',
  path: '/creditos',
});

const LINK = 'text-secondary underline underline-offset-4 transition-colors duration-300 hover:text-secondary/75';

export default function CreditosPage() {
  const magnific = IMAGE_CREDITS.filter((c) => c.source === 'magnific');
  const freepik = IMAGE_CREDITS.filter((c) => c.source === 'freepik');

  return (
    <LegalPage lead="Licencia y" rotating="créditos" updated="16 de septiembre de 2026">
      <p className="text-fourth/75 text-base lg:text-lg">
        Las fotografías de stands y montajes que aparecen en este sitio son de proyectos reales
        de Octa Building Studio. Los fondos y recursos gráficos de apoyo proceden de las fuentes
        que se indican a continuación, y se acreditan conforme a la licencia de cada una.
      </p>

      <LegalBlock title="Fondos generados con Magnific">
        {/* Una sola atribucion visible para todo el conjunto, con enlace, y
            debajo la lista de donde aparece cada fondo. */}
        <p>
          <a href={MAGNIFIC_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer" className={LINK}>
            {MAGNIFIC_ATTRIBUTION.text}
          </a>
        </p>

        <ul role="list" className="flex flex-col">
          {magnific.map((credit) => (
            <li
              key={credit.title}
              className="border-fourth/30 flex flex-col gap-1 border-t py-4 first:border-t-0 first:pt-0"
            >
              <span className="text-secondary text-sm lg:text-base font-medium">{credit.title}</span>
              <span className="text-sm lg:text-base">Usado en: {credit.usedIn}</span>
            </li>
          ))}
        </ul>
      </LegalBlock>

      <LegalBlock title="Imágenes de Freepik">
        {freepik.length === 0 ? (
          <p>Todavía no hay imágenes de Freepik que acreditar.</p>
        ) : (
          <ul role="list" className="flex flex-col">
            {freepik.map((credit) => (
              <li
                key={credit.url}
                className="border-fourth/30 flex flex-col gap-1 border-t py-4 first:border-t-0 first:pt-0"
              >
                <span className="text-secondary text-sm lg:text-base font-medium">{credit.title}</span>

                {/* Formato de atribucion que pide Freepik: autor y enlace al recurso. */}
                <a href={credit.url} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Imagen de {credit.author} en Freepik
                </a>

                <span className="text-sm lg:text-base">Usada en: {credit.usedIn}</span>
              </li>
            ))}
          </ul>
        )}
      </LegalBlock>
      <LegalBlock title="Desarrollo del sitio">
        <p>
          Este sitio fue diseñado y desarrollado por{' '}
          {DEVELOPER.url ? (
            <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer" className={LINK}>
              {DEVELOPER.name}
            </a>
          ) : (
            <span className="text-secondary font-medium">{DEVELOPER.name}</span>
          )}
          .
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
