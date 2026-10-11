import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI!
export const FRONTEND_URL = process.env.FRONTEND_URL!
export const SECRET_KEY = process.env.SECRET_KEY!
export const PORT = process.env.PORT!
export const IS_DEV = process.env.NODE_ENV === "development"
export const IS_PROD = process.env.NODE_ENV === "production"
export const UPLOADS_PATH = process.env.UPLOADS_PATH || 'uploads'
/** URL publica del propio backend, para construir enlaces absolutos a /files. */
export const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 4000}`

// ---- Analitica del dashboard (todas opcionales: sin ellas el panel muestra estados vacios) ----

/** Zona horaria del negocio: alinea GA4, Search Console y PostHog. */
export const ANALYTICS_TIMEZONE = process.env.ANALYTICS_TIMEZONE || 'America/Mexico_City'

/** Cuenta de servicio de Google con acceso de lectura a GA4 y Search Console. */
export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || ''
/** La clave llega con `\n` escapados cuando se pega en el panel del hosting. */
export const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')

/** Id numerico de la propiedad de GA4 (Administrar > Configuracion de la propiedad). */
export const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || ''

/** Propiedad de Search Console: `sc-domain:dominio.com` o la URL con prefijo. */
export const GSC_SITE_URL = process.env.GSC_SITE_URL || ''

/** Personal API key de PostHog con permiso de lectura de queries. */
export const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY || ''
export const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID || ''
export const POSTHOG_API_HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com'
