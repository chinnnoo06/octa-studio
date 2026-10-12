import { TBlogSEO } from "../types/blog/blog.types";

export const META_TITLE_MAX = 60;
export const META_DESCRIPTION_MAX = 160;

/** Recorta en el ultimo espacio antes del limite y añade "…" si sobro texto. */
export const truncate = (text: string, max: number) => {
    const clean = text.replace(/\s+/g, " ").trim();

    if (clean.length <= max) return clean;

    const cut = clean.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");

    return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:-]+$/, "")}…`;
};

/**
 * SEO con valores por defecto: lo que se deje vacio en el formulario se llena
 * con el titulo (meta titulo) y con el resumen o la descripcion (meta descripcion).
 */
export const buildSeo = (seo: Partial<TBlogSEO> | undefined, title: string, summary: string): TBlogSEO => ({
    metaTitle: seo?.metaTitle?.trim() || truncate(title, META_TITLE_MAX),
    metaDescription: seo?.metaDescription?.trim() || truncate(summary, META_DESCRIPTION_MAX)
});
