import path from "path";

import { BlogRepository, PUBLIC_BLOG_FILTER } from "../repositories/Blog.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TBlogDto, TGetAdminBlogsQuery } from "../types/blog/blog.dtos";
import { TBlog, TBlogDocument, TBlogVirtuals } from "../types/blog/blog.types";
import { BlogCategoryRepository } from "../repositories/BlogCategory.repository";
import { deleteAllUploadedFiles, deleteFilesByName } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { buildSeo, truncate } from "../utils/seo";
import { toPagination } from "../utils/listQuery";
import { CONTENT_IMAGES_PATH, contentToText, extractContentImages } from "../utils/blogContent";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "blogs");
const contentImagesDir = path.resolve(UPLOADS_PATH, "blogs", "content");

const BLOGS_PER_PAGE = 6;

/** El panel muestra mas filas por pagina que la web. */
const ADMIN_BLOGS_PER_PAGE = 10;

/** Largo del extracto que se genera del contenido cuando se deja vacio. */
const AUTO_EXCERPT_LENGTH = 160;

const MOST_READ = 5;

/** Entradas sugeridas al final de cada articulo. */
const RELATED_BLOGS = 3;

const toSummary = (blog: TBlogDocument) => {
    const { content, ...summary } = blog.toJSON<TBlog & TBlogVirtuals>()
    return summary
}

const resolveExcerpt = (data: TBlogDto) => data.excerpt?.trim() || truncate(contentToText(data.content), AUTO_EXCERPT_LENGTH)

const resolveCategory = async (id?: string) => {
    if (!id) return null

    const category = await BlogCategoryRepository.findById(id)

    if (!category) throw new HttpError(400, "The selected blog category does not exist");

    return category._id
}

export class BlogService {

    static async getBlogs(page: number, categoryId?: string) {
        const filter = {
            ...PUBLIC_BLOG_FILTER,
            ...(categoryId ? { category: categoryId } : {})
        }

        const result = await BlogRepository.findPaginated(page, BLOGS_PER_PAGE, filter)

        return {
            blogs: result.docs.map(toSummary),
            pagination: toPagination(result)
        }
    }

    static async getAdminBlogs(query: TGetAdminBlogsQuery) {
        const result = await BlogRepository.findAdminPaginated(query, ADMIN_BLOGS_PER_PAGE)

        return {
            blogs: result.docs.map(toSummary),
            pagination: toPagination(result)
        }
    }

    /** El middleware (publico por slug, admin por id) ya verifico que existe. */
    static async getBlog(id: string) {
        const blog = await BlogRepository.findByIdPopulated(id)

        if (!blog) {
            throw new HttpError(404, "Blog not found");
        }

        return blog
    }

    /** Datos internos del bloque "Blog" del dashboard. */
    static async getStats() {
        const [totals, mostRead, latest] = await Promise.all([
            BlogRepository.getTotals(),
            BlogRepository.findMostRead(MOST_READ),
            BlogRepository.findLatestPublished()
        ])

        return {
            total: totals.total,
            published: totals.total - totals.drafts,
            drafts: totals.drafts,
            totalViews: totals.totalViews,
            mostRead: mostRead.map(blog => ({
                _id: String(blog._id),
                title: blog.title,
                slug: blog.slug,
                views: blog.views ?? 0
            })),
            latest: latest
                ? { _id: String(latest._id), title: latest.title, slug: latest.slug, createdAt: latest.createdAt }
                : null
        }
    }

    /** Primero los de la misma categoria y, si faltan, los mas recientes del blog. */
    static async getRelatedBlogs(blog: TBlogDocument) {
        const categoryId = blog.populated("category") ?? blog.category

        const sameCategory = categoryId
            ? await BlogRepository.findLatest({ category: categoryId }, [blog._id], RELATED_BLOGS)
            : []

        const latest = await BlogRepository.findLatest(
            {},
            [blog._id, ...sameCategory.map(related => related._id)],
            RELATED_BLOGS - sameCategory.length
        )

        return [...sameCategory, ...latest].map(toSummary)
    }

    static async registerView(slug: string) {
        await BlogRepository.incrementViews(slug)
    }

    static async createBlog(data: TBlogDto, files: TMulterFiles) {
        try {
            const slug = buildSlug(data.title)

            const slugTaken = await BlogRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A blog with that title already exists");
            }

            const image = files.blogImage?.[0]?.filename

            if (!image) {
                throw new HttpError(400, "A featured image is required for the blog");
            }

            const excerpt = resolveExcerpt(data)

            await BlogRepository.createBlog({
                title: data.title,
                excerpt,
                category: await resolveCategory(data.category),
                status: data.status,
                content: data.content,
                seo: buildSeo(data.seo, data.title, excerpt),
                slug,
                image
            })

        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    }

    /** Edita datos y, si llega, reemplaza la imagen destacada (la anterior se borra al guardar). */
    static async updateBlog(blog: TBlogDocument, data: TBlogDto, files?: TMulterFiles) {
        const slug = buildSlug(data.title)

        if (slug !== blog.slug) {
            const slugTaken = await BlogRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A blog with that title already exists");
            }
        }

        const newImage = files?.blogImage?.[0]?.filename
        const oldImage = blog.image

        // Las imagenes del cuerpo que ya no aparecen en el HTML nuevo se borran
        // del disco despues de guardar, para no dejar huerfanos.
        const before = extractContentImages(blog.content)
        const after = new Set(extractContentImages(data.content))
        const removed = before.filter(name => !after.has(name))

        const excerpt = resolveExcerpt(data)

        blog.slug = slug
        blog.title = data.title
        blog.excerpt = excerpt
        blog.category = await resolveCategory(data.category)
        blog.status = data.status
        blog.content = data.content
        blog.seo = buildSeo(data.seo, data.title, excerpt)
        if (newImage) blog.image = newImage

        await blog.save()

        deleteFilesByName(contentImagesDir, removed)
        if (newImage) deleteFilesByName(imagesDir, [oldImage])
    }

    static uploadContentImage(files: TMulterFiles) {
        const file = files.blogContentImage?.[0]

        if (!file) {
            throw new HttpError(400, "An image is required");
        }

        return `${CONTENT_IMAGES_PATH}/${file.filename}`
    }

    static async deleteBlog(blog: TBlogDocument) {
        await blog.deleteOne()

        deleteFilesByName(imagesDir, [blog.image])
        deleteFilesByName(contentImagesDir, extractContentImages(blog.content))
    }

    /** Borrado masivo del panel: cada blog se lleva su imagen y las de su contenido. */
    static async deleteBlogs(ids: string[]) {
        const blogs = await BlogRepository.findByIds(ids)

        if (blogs.length === 0) {
            throw new HttpError(404, "No blogs found to delete");
        }

        await BlogRepository.deleteByIds(blogs.map(blog => String(blog._id)))

        blogs.forEach(blog => {
            deleteFilesByName(imagesDir, [blog.image])
            deleteFilesByName(contentImagesDir, extractContentImages(blog.content))
        })

        return blogs.length
    }
}
