import { model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { BlogStatus, TBlog, TBlogSEO, TBlogVirtuals } from "../types/blog/blog.types";
import { readingTimeOf } from "../utils/blogContent";

const BlogSEOSchema = new Schema<TBlogSEO>(
    {
        metaTitle: {
            type: String,
            required: true,
            trim: true,
            maxlength: 60
        },
        metaDescription: {
            type: String,
            required: true,
            trim: true,
            maxlength: 160
        }
    },
    { _id: false }
)

const BlogSchema = new Schema<TBlog, PaginateModel<TBlog>, {}, {}, TBlogVirtuals>(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        // Si se deja vacio en el formulario, el servicio lo genera del contenido.
        excerpt: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "BlogCategory",
            default: null
        },

        // Los blogs creados antes de existir el campo no lo tienen en la BD;
        // por eso las consultas publicas filtran por "no es borrador".
        status: {
            type: String,
            required: true,
            enum: Object.values(BlogStatus),
            default: BlogStatus.PUBLISHED
        },

        views: {
            type: Number,
            min: 0,
            default: 0
        },

        image: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        seo: {
            type: BlogSEOSchema,
            required: true
        }
    },
    {
        timestamps: true,
        // El tiempo de lectura viaja en las respuestas aunque no se guarde.
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// Minutos de lectura calculados del contenido (200 palabras por minuto).
BlogSchema.virtual("readingTime").get(function () {
    return readingTimeOf(this.content ?? "")
})

BlogSchema.plugin(mongoosePaginate);

export const Blog = model<TBlog, PaginateModel<TBlog>>("Blog", BlogSchema, "blogs")
