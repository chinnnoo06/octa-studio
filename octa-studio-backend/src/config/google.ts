import { JWT } from "google-auth-library";
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "./env";

const SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly"
];

let client: JWT | null = null;

export const hasGoogleCredentials = () => Boolean(GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY);

/**
 * Cliente de la cuenta de servicio, compartido por GA4 y Search Console. Se
 * crea al primer uso y reutiliza su token hasta que caduca.
 */
export const getGoogleClient = () => {
    if (!hasGoogleCredentials()) return null;

    client ??= new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: SCOPES
    });

    return client;
};
