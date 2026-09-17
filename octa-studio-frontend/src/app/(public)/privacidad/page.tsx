import { pageMetadata } from '@/utils/metadata';
import { LegalPage } from '@/components/legal/LegalPage';
import { LegalBlock } from '@/components/legal/LegalBlock';
import { CONTACT } from '@/utils/data/contact';

export const metadata = pageMetadata({
  title: 'Aviso de privacidad y aviso legal',
  description:
    'Qué datos recibe Octa Building Studio cuando nos contactas, para qué los usa, cómo ejercer tus derechos y en qué términos se ofrece este sitio.',
  path: '/privacidad',
});

const [proyectos, direccion] = CONTACT.emails;

export default function PrivacidadPage() {
  return (
    <LegalPage lead="Privacidad y" rotating="aviso legal" updated="16 de septiembre de 2026">
      <p className="text-fourth/75 text-base lg:text-lg">
        Este sitio no tiene formularios ni recoge datos por su cuenta. Los únicos datos personales
        que llegan a Octa Building Studio son los que tú decides compartir cuando nos escribes por
        WhatsApp, nos llamas o nos mandas un correo. Aquí explicamos qué hacemos con ellos y en
        qué condiciones se ofrece el contenido de esta web.
      </p>

      <LegalBlock title="Responsable">
        <p>
          Octa Building Studio es el responsable del tratamiento de los datos personales que
          recibe a través de los canales de contacto publicados en este sitio. Para cualquier
          asunto relacionado con tus datos puedes escribir a{' '}
          <a href={direccion.href} className="text-secondary underline underline-offset-4">
            {direccion.address}
          </a>
          .
        </p>
      </LegalBlock>

      <LegalBlock title="Qué datos recibimos">
        <p>
          Al contactarnos por WhatsApp, teléfono o correo recibimos los datos que tú incluyes en
          ese contacto: normalmente tu nombre, un teléfono o correo de respuesta, la empresa a la
          que representas y la información del proyecto que quieres cotizar (fecha, recinto,
          metros, referencias o planos).
        </p>
        <p>
          No recabamos datos sensibles ni pedimos más información de la necesaria para cotizar y
          dar seguimiento a tu proyecto.
        </p>
      </LegalBlock>

      <LegalBlock title="Para qué los usamos">
        <p>
          Para responder a tu solicitud, preparar la cotización, coordinar el proyecto si se
          contrata y mantener el contacto durante el mismo. No usamos tus datos para enviarte
          publicidad ni los incorporamos a listas de correo sin que nos lo pidas.
        </p>
      </LegalBlock>

      <LegalBlock title="Con quién los compartimos">
        <p>
          Con nadie. No vendemos, cedemos ni transferimos tus datos a terceros, salvo que una
          autoridad lo requiera conforme a la ley. Los mensajes de WhatsApp y los correos se
          gestionan a través de los servicios de esas plataformas, cada una bajo sus propias
          políticas.
        </p>
      </LegalBlock>

      <LegalBlock title="Tus derechos">
        <p>
          Puedes acceder a los datos que tenemos sobre ti, rectificarlos, pedir que los
          cancelemos u oponerte a su uso (derechos ARCO) escribiendo a{' '}
          <a href={direccion.href} className="text-secondary underline underline-offset-4">
            {direccion.address}
          </a>{' '}
          desde el correo con el que nos contactaste, o indicándonos cómo verificar tu identidad.
          Respondemos en los plazos que marca la Ley Federal de Protección de Datos Personales en
          Posesión de los Particulares.
        </p>
      </LegalBlock>

      <LegalBlock title="Cookies y analítica">
        <p>
          Este sitio no usa cookies de rastreo, analítica ni herramientas de publicidad. La única
          cookie que existe es técnica y la recibe exclusivamente el personal de Octa Building
          Studio al iniciar sesión en el panel de administración; ningún visitante la recibe.
        </p>
        <p>
          El sitio se aloja en la infraestructura de Vercel, cuyos servidores registran datos
          técnicos de conexión, como la dirección IP, con el único fin de servir las páginas y
          proteger el servicio.
        </p>
      </LegalBlock>

      <LegalBlock title="Aviso legal">
        <p>
          El titular de este sitio es Octa Building Studio. Su contenido es informativo: las
          descripciones de servicios, cifras y proyectos sirven para que conozcas nuestro
          trabajo, y no constituyen una oferta vinculante. Toda cotización se emite por escrito y
          por separado, a través de{' '}
          <a href={proyectos.href} className="text-secondary underline underline-offset-4">
            {proyectos.address}
          </a>
          .
        </p>
        <p>
          Las fotografías de proyectos, así como los logotipos y marcas de los clientes que
          aparecen en ellas, pertenecen a sus respectivos titulares y se muestran únicamente como
          referencia del trabajo realizado. Las imágenes de terceros usadas en el diseño del
          sitio se acreditan en la página de créditos.
        </p>
        <p>
          Los enlaces a WhatsApp y otros servicios externos llevan a plataformas ajenas a Octa
          Building Studio, sobre cuyo funcionamiento y políticas no tenemos control.
        </p>
      </LegalBlock>

      <LegalBlock title="Cambios a este aviso">
        <p>
          Si el sitio incorpora formularios, analítica o cualquier otro tratamiento de datos,
          actualizaremos este aviso y la fecha que aparece al inicio de la página.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
