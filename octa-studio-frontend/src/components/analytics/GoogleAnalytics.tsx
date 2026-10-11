import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Etiqueta de GA4 para el sitio publico. Sin `NEXT_PUBLIC_GA_ID` no carga nada.
 * Los cambios de pagina del App Router los mide la "medicion mejorada" de GA4
 * (eventos del historial del navegador), activa por defecto.
 */
export const GoogleAnalytics = () => {
    if (!GA_ID) return null;

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
        </>
    );
};
