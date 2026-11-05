import { TSeo } from "../types/common/common.types";

export const META_TITLE_MAX = 60;
export const META_DESCRIPTION_MAX = 160;

export const truncate = (text: string, max: number) => {
    const clean = text.replace(/\s+/g, " ").trim();

    if (clean.length <= max) return clean;

    const cut = clean.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");

    return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:-]+$/, "")}…`;
};

export const buildSeo = (seo: Partial<TSeo> | undefined, title: string, summary: string): TSeo => ({
    metaTitle: seo?.metaTitle?.trim() || truncate(title, META_TITLE_MAX),
    metaDescription: seo?.metaDescription?.trim() || truncate(summary, META_DESCRIPTION_MAX)
});
