import { model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { BlogCategory, TBlog, TBlogSEO } from "../types/blog/blog.types";

/* -------------------------------------------------------------------------- */
/*                                   SEO                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                    BLOG                                    */
/* -------------------------------------------------------------------------- */

const BlogSchema = new Schema<TBlog>(
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

        excerpt: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300
        },

        category: {
            type: String,
            required: true,
            trim: true,
            enum: Object.values(BlogCategory)
        },

        readingTime: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Reading time must be a whole number of minutes"
            }
        },

        // Una sola imagen destacada. Las del cuerpo viven dentro de `content`.
        image: {
            type: String,
            required: true,
            trim: true
        },

        // HTML ya saneado por validateBlogInput; el modelo solo exige que exista.
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
    }
)

BlogSchema.plugin(mongoosePaginate);

export const Blog = model<TBlog, PaginateModel<TBlog>>("Blog", BlogSchema, "blogs")
