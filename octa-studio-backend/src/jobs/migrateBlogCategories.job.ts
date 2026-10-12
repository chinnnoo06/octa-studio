import mongoose from "mongoose";

import { Blog } from "../models/Blog";
import { blogCategoryRepository } from "../repositories/blogCategory.repository";
import { LEGACY_BLOG_CATEGORIES } from "../types/blogCategory/blogCategory.types";
import { buildSlug } from "../utils/slug";
import { IS_PROD } from "../config/env";

/** Categoria por nombre; si no existe se crea al final de la lista. */
const ensureCategory = async (name: string) => {
    const existing = await blogCategoryRepository.findByName(name)

    if (existing) return existing._id

    const created = await blogCategoryRepository.create({
        name,
        slug: buildSlug(name),
        description: "",
        seo: { metaTitle: "", metaDescription: "" },
        position: (await blogCategoryRepository.maxPosition()) + 1
    })

    return created._id
}

/**
 * Paso de categorias fijas (texto) a la coleccion `blog_categories`. Es
 * idempotente: corre en cada arranque y solo actua sobre lo que falte migrar.
 *  1. Si no hay categorias, siembra las que antes estaban en el codigo.
 *  2. Los blogs con la categoria como texto pasan a la referencia.
 *  3. Se quita `readingTime`, que ahora se calcula del contenido.
 */
export const migrateBlogCategories = async () => {
    if ((await blogCategoryRepository.count()) === 0) {
        for (const name of LEGACY_BLOG_CATEGORIES) await ensureCategory(name)
        console.log(`[jobs] Categorías de blog sembradas: ${LEGACY_BLOG_CATEGORIES.length}`)
    }

    // Lectura en crudo: el modelo ya espera un ObjectId y no casteria el texto.
    const legacyBlogs = await Blog.collection
        .find({ category: { $type: "string" } }, { projection: { category: 1 } })
        .toArray()

    for (const blog of legacyBlogs) {
        const name = String(blog.category).trim()
        const categoryId = name ? await ensureCategory(name) : null

        await Blog.collection.updateOne({ _id: blog._id }, { $set: { category: categoryId } })
    }

    if (legacyBlogs.length > 0) console.log(`[jobs] Blogs migrados a categorías editables: ${legacyBlogs.length}`)

    await Blog.collection.updateMany({ readingTime: { $exists: true } }, { $unset: { readingTime: "" } })
}

/**
 * Solo en produccion (`NODE_ENV=production`): en local la base puede ser la
 * misma que la del sitio en vivo, y migrarla antes de desplegar el frontend
 * nuevo romperia las paginas publicas del blog.
 */
export const runBlogCategoriesMigration = () => {
    if (!IS_PROD) return

    const run = () => migrateBlogCategories().catch(error => console.error("[jobs] Error migrando categorías de blog", error))

    if (mongoose.connection.readyState === 1) run();
    else mongoose.connection.once("open", run);
}
