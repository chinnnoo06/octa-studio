import fs from "fs";
import path from "path";

import { blogRepository, PUBLIC_BLOG_FILTER } from "../repositories/blog.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TBlogDto, TGetAdminBlogsQuery } from "../types/blog/blog.dtos";
import { TBlogDocument } from "../types/blog/blog.types";
import { blogCategoryRepository } from "../repositories/blogCategory.repository";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { buildSeo, truncate } from "../utils/seo";
import { buildSort, dateRangeFilter, searchFilter, toPagination } from "../utils/listQuery";
import { CONTENT_IMAGES_PATH, contentToText, extractContentImages } from "../utils/blogContent";
import { PUBLIC_URL, UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "blogs");
const contentImagesDir = path.resolve(UPLOADS_PATH, "blogs", "content");

const BLOGS_PER_PAGE = 6;

/** El panel muestra mas filas por pagina que la web. */
const ADMIN_BLOGS_PER_PAGE = 10;

const ADMIN_SORTABLE = ["title", "status", "views", "createdAt"];

/** Largo del extracto que se genera del contenido cuando se deja vacio. */
const AUTO_EXCERPT_LENGTH = 160;

const MOST_READ = 5;

const deleteFromDisk = (dir: string, names: string[]) => {
    names.forEach(name => {
        const filePath = path.join(dir, name)

        try {
            fs.unlinkSync(filePath)
            console.log(`Image deleted: ${name}`);
        } catch (err) {
            console.error(`Error deleting ${name}`)
        }
    })
}

const deleteFeaturedImage = (name: string) => deleteFromDisk(imagesDir, [name])
const deleteContentImages = (names: string[]) => deleteFromDisk(contentImagesDir, names)

/** Extracto escrito a mano o, si se dejo vacio, el inicio del contenido. */
const resolveExcerpt = (data: TBlogDto) => data.excerpt?.trim() || truncate(contentToText(data.content), AUTO_EXCERPT_LENGTH)

/** Id de categoria valido o `null` ("Sin categoría"). */
const resolveCategory = async (id?: string) => {
    if (!id) return null

    const category = await blogCategoryRepository.findById(id)

    if (!category) throw new HttpError(400, "The selected blog category does not exist");

    return category._id
}

export const BlogService = {

    /** Listado publico; `categorySlug` viene del filtro `/blogs?categoria=`. */
    async getBlogs(page: number, categorySlug?: string) {
        const category = categorySlug ? await blogCategoryRepository.findBySlug(categorySlug) : null

        // Una categoria que no existe devuelve una pagina vacia, no todo el blog.
        if (categorySlug && !category) {
            return { blogs: [], pagination: toPagination({ page, limit: BLOGS_PER_PAGE, totalDocs: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false }) }
        }

        const filter = {
            ...PUBLIC_BLOG_FILTER,
            ...(category ? { category: category._id } : {})
        }

        const result = await blogRepository.findPaginated(page, BLOGS_PER_PAGE, filter)

        return {
            blogs: result.docs,
            pagination: toPagination(result)
        }
    },

    async getAdminBlogs({ page, search, category, status, from, to, sort, order }: TGetAdminBlogsQuery) {
        const filter = {
            ...searchFilter(search, ["title", "excerpt"]),
            ...(category ? { category } : {}),
            ...(status ? { status } : {}),
            ...dateRangeFilter(from, to)
        }

        const result = await blogRepository.findPaginated(
            Number(page ?? 1),
            ADMIN_BLOGS_PER_PAGE,
            filter,
            buildSort(sort, order, ADMIN_SORTABLE)
        )

        return {
            blogs: result.docs,
            pagination: toPagination(result)
        }
    },

    /** Datos internos del bloque "Blog" del dashboard. */
    async getStats() {
        const [totals, mostRead, latest] = await Promise.all([
            blogRepository.getTotals(),
            blogRepository.findMostRead(MOST_READ),
            blogRepository.findLatestPublished()
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
    },

    async registerView(slug: string) {
        await blogRepository.incrementViews(slug)
    },

    async createBlog(data: TBlogDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.title)

            const slugTaken = await blogRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A blog with that title already exists");
            }

            const image = files?.blogImage?.[0]?.filename

            if (!image) {
                throw new HttpError(400, "A featured image is required for the blog");
            }

            const excerpt = resolveExcerpt(data)

            await blogRepository.createBlog({
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
    },

    /** Edita datos y, si llega, reemplaza la imagen destacada (la anterior se borra al guardar). */
    async updateBlog(blog: TBlogDocument, data: TBlogDto, files?: TMulterFiles) {
        const slug = buildSlug(data.title)

        if (slug !== blog.slug) {
            const slugTaken = await blogRepository.findBySlug(slug)

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

        deleteContentImages(removed)
        if (newImage) deleteFeaturedImage(oldImage)
    },

    uploadContentImage(files?: TMulterFiles) {
        const file = files?.blogContentImage?.[0]

        if (!file) {
            throw new HttpError(400, "An image is required");
        }

        const relativePath = `${CONTENT_IMAGES_PATH}/${file.filename}`

        return {
            path: relativePath,
            url: `${PUBLIC_URL}${relativePath}`
        }
    },

    async deleteBlog(blog: TBlogDocument) {
        await blog.deleteOne()

        deleteFeaturedImage(blog.image)
        deleteContentImages(extractContentImages(blog.content))
    },

    /** Borrado masivo del panel: cada blog se lleva su imagen y las de su contenido. */
    async deleteBlogs(ids: string[]) {
        const blogs = await blogRepository.findByIds(ids)

        if (blogs.length === 0) {
            throw new HttpError(404, "No blogs found to delete");
        }

        await blogRepository.deleteByIds(blogs.map(blog => String(blog._id)))

        blogs.forEach(blog => {
            deleteFeaturedImage(blog.image)
            deleteContentImages(extractContentImages(blog.content))
        })

        return blogs.length
    }
}
