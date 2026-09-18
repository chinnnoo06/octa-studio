import sanitizeHtml from "sanitize-html";
import { PUBLIC_URL } from "../config/env";

/** Ruta publica (relativa al backend) de las imagenes del cuerpo de un blog. */
export const CONTENT_IMAGES_PATH = "/files/blogs/content";

/**
 * Lo que puede llevar el HTML de un articulo. Todo lo demas se elimina al
 * sanear: etiquetas fuera de la lista, atributos `style`, fuentes, colores,
 * scripts. El estilo del articulo lo pone la web, no el editor.
 */
const ALLOWED_TAGS = [
    "p", "h2", "h3", "h4", "br", "hr",
    "ul", "ol", "li",
    "blockquote",
    "strong", "b", "em", "i", "u", "s",
    "a",
    "img", "figure", "figcaption",
    "table", "thead", "tbody", "tr", "th", "td"
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"]
};

// Prefijos aceptados en `img src`: la ruta relativa, o la absoluta de este
// mismo backend (que es lo que TinyMCE guarda tras subir la imagen).
const ABSOLUTE_PREFIX = `${PUBLIC_URL}${CONTENT_IMAGES_PATH}/`;
const RELATIVE_PREFIX = `${CONTENT_IMAGES_PATH}/`;

const toRelativeSrc = (src: string) => {
    if (src.startsWith(ABSOLUTE_PREFIX)) return RELATIVE_PREFIX + src.slice(ABSOLUTE_PREFIX.length);
    if (src.startsWith(RELATIVE_PREFIX)) return src;
    return null;
};

/**
 * Sanea el HTML del editor y deja las imagenes con ruta relativa, para que el
 * contenido no dependa del dominio donde corra el backend. Las imagenes que
 * no sean de este backend se eliminan.
 */
export const sanitizeBlogContent = (html: string) =>
    sanitizeHtml(html, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRIBUTES,
        allowedSchemes: ["http", "https", "mailto", "tel"],
        // El sanitizer solo deja pasar esquemas absolutos; las rutas relativas
        // de nuestras imagenes se aceptan aqui abajo, ya normalizadas.
        allowedSchemesAppliedToAttributes: ["href"],
        exclusiveFilter: (frame) => frame.tag === "img" && !frame.attribs.src,
        transformTags: {
            img: (tagName, attribs) => {
                const src = toRelativeSrc(attribs.src ?? "");
                if (!src) return { tagName, attribs: {} }; // sin src valido -> exclusiveFilter lo quita
                return { tagName, attribs: { ...attribs, src } };
            },
            a: (tagName, attribs) => ({
                tagName,
                attribs: attribs.target === "_blank"
                    ? { ...attribs, rel: "noopener noreferrer" }
                    : attribs
            })
        }
    });

/** Nombres de archivo de las imagenes del cuerpo, sin duplicados. */
export const extractContentImages = (html: string) => {
    const names = new Set<string>();
    const re = new RegExp(`${RELATIVE_PREFIX.replace(/\//g, "\\/")}([^"'\\s>]+)`, "g");
    for (const match of html.matchAll(re)) names.add(match[1]);
    return [...names];
};

/** Texto plano del HTML, para comprobar que el articulo no esta vacio. */
export const contentToText = (html: string) =>
    sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
