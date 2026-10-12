import { blogCategoryRepository } from "../repositories/blogCategory.repository";
import { TBlogCategoryDto } from "../types/blogCategory/blogCategory.dtos";
import { TBlogCategoryDocument } from "../types/blogCategory/blogCategory.types";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";

/** Slug escrito a mano o, si se deja vacio, el del nombre. */
const resolveSlug = (data: TBlogCategoryDto) => buildSlug(data.slug?.trim() || data.name)

const assertSlugFree = async (slug: string, currentId?: string) => {
    if (!slug) throw new HttpError(400, "The slug is required");

    const taken = await blogCategoryRepository.findBySlug(slug)

    if (taken && String(taken._id) !== currentId) {
        throw new HttpError(409, "A blog category with that slug already exists");
    }
}

const toSEO = (data: TBlogCategoryDto) => ({
    metaTitle: data.seo?.metaTitle?.trim() ?? "",
    metaDescription: data.seo?.metaDescription?.trim() ?? ""
})

export const BlogCategoryService = {

    /** Listado ordenado; con `withCounts` añade cuantas entradas tiene cada una (panel). */
    async getCategories(withCounts = false) {
        const categories = await blogCategoryRepository.findAll()

        if (!withCounts) return categories

        const counts = await blogCategoryRepository.countBlogsByCategory()

        return categories.map(category => ({
            ...category.toObject(),
            totalBlogs: counts.get(String(category._id)) ?? 0
        }))
    },

    async createCategory(data: TBlogCategoryDto) {
        const slug = resolveSlug(data)

        await assertSlugFree(slug)

        const position = (await blogCategoryRepository.maxPosition()) + 1

        await blogCategoryRepository.create({
            name: data.name.trim(),
            slug,
            description: data.description?.trim() ?? "",
            seo: toSEO(data),
            position
        })
    },

    async updateCategory(category: TBlogCategoryDocument, data: TBlogCategoryDto) {
        const slug = resolveSlug(data)

        await assertSlugFree(slug, String(category._id))

        category.name = data.name.trim()
        category.slug = slug
        category.description = data.description?.trim() ?? ""
        category.seo = toSEO(data)

        await category.save()
    },

    async deleteCategory(category: TBlogCategoryDocument) {
        await blogCategoryRepository.unassignFromBlogs([String(category._id)])
        await category.deleteOne()
    },

    async deleteCategories(ids: string[]) {
        const categories = await blogCategoryRepository.findByIds(ids)

        if (categories.length === 0) {
            throw new HttpError(404, "No blog categories found to delete");
        }

        const found = categories.map(category => String(category._id))

        await blogCategoryRepository.unassignFromBlogs(found)
        await blogCategoryRepository.deleteByIds(found)

        return found.length
    }
}
