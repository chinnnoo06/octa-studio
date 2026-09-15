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
/*                             CONTENT BLOCKS                                 */
/* -------------------------------------------------------------------------- */

// Base schema: only the discriminator key, so an unknown block type is rejected.
// Each block type declares its own fields through a discriminator below.
const ContentBlockSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["paragraph", "heading", "list", "quote"]
        }
    },
    { discriminatorKey: "type" }
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

        images: {
            type: [String],
            required: true,
            validate: {
                validator: (arr: string[]) => arr.length > 0,
                message: "At least one image is required"
            }
        },

        content: {
            type: [ContentBlockSchema],
            required: true,
            validate: {
                validator: (blocks: unknown[]) => blocks.length > 0,
                message: "The blog must have at least one content block"
            }
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

const contentBlocks = BlogSchema.path<Schema.Types.DocumentArray>("content")

contentBlocks.discriminator("paragraph", new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    }
}))

contentBlocks.discriminator("heading", new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        required: true,
        enum: [2, 3]
    }
}))

contentBlocks.discriminator("list", new Schema({
    ordered: {
        type: Boolean,
        required: true,
        default: false
    },
    items: {
        type: [String],
        required: true,
        validate: {
            validator: (items: string[]) => items.length > 0,
            message: "A list block must have at least one item"
        }
    }
}))

contentBlocks.discriminator("quote", new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    cite: {
        type: String,
        trim: true
    }
}))

BlogSchema.plugin(mongoosePaginate);

export const Blog = model<TBlog, PaginateModel<TBlog>>("Blog", BlogSchema, "blogs")
