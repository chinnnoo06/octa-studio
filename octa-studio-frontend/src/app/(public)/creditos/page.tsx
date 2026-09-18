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
  return (
    <LegalPage lead="Licencia y" rotating="créditos" updated="16 de septiembre de 2026">
      <p className="text-fourth/75 text-base lg:text-lg">
        Las fotografías de stands y montajes que aparecen en este sitio son de proyectos reales
        de Octa Building Studio. Los fondos de apoyo se generaron con Magnific y se acreditan
        conforme a su licencia.
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
          {IMAGE_CREDITS.map((credit) => (
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
