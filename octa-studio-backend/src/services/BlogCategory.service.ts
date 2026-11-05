import { BlogCategoryRepository } from "../repositories/BlogCategory.repository";
import { TBlogCategoryDto } from "../types/blogCategory/blogCategory.dtos";
import { TBlogCategoryDocument } from "../types/blogCategory/blogCategory.types";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { buildSeo } from "../utils/seo";

export class BlogCategoryService {

    /** Listado ordenado; con `withCounts` añade cuantas entradas tiene cada una (panel). */
    static async getCategories(withCounts = false) {
        const categories = await BlogCategoryRepository.findAll()

        if (!withCounts) return categories

        const counts = await BlogCategoryRepository.countBlogsByCategory()

        return categories.map(category => ({
            ...category.toObject(),
            totalBlogs: counts.get(String(category._id)) ?? 0
        }))
    }

    static async createCategory(data: TBlogCategoryDto) {
        const slug = buildSlug(data.name)

        const slugTaken = await BlogCategoryRepository.findBySlug(slug)

        if (slugTaken) {
            throw new HttpError(409, "A blog category with that name already exists");
        }

        const position = (await BlogCategoryRepository.maxPosition()) + 1

        const description = data.description.trim()

        await BlogCategoryRepository.create({
            name: data.name.trim(),
            slug,
            description,
            seo: buildSeo(data.seo, data.name, description),
            position
        })
    }

    static async updateCategory(category: TBlogCategoryDocument, data: TBlogCategoryDto) {
        const slug = buildSlug(data.name)

        if (slug !== category.slug) {
            const slugTaken = await BlogCategoryRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A blog category with that name already exists");
            }
        }

        const description = data.description.trim()

        category.name = data.name.trim()
        category.slug = slug
        category.description = description
        category.seo = buildSeo(data.seo, data.name, description)

        await category.save()
    }

    static async deleteCategory(category: TBlogCategoryDocument) {
        await BlogCategoryRepository.unassignFromBlogs([String(category._id)])
        await category.deleteOne()
    }

    static async deleteCategories(ids: string[]) {
        const categories = await BlogCategoryRepository.findByIds(ids)

        if (categories.length === 0) {
            throw new HttpError(404, "No blog categories found to delete");
        }

        const found = categories.map(category => String(category._id))

        await BlogCategoryRepository.unassignFromBlogs(found)
        await BlogCategoryRepository.deleteByIds(found)

        return found.length
    }
}
