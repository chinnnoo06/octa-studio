import { model, Schema } from "mongoose";
import { TBlogCategory, TBlogCategorySEO } from "../types/blogCategory/blogCategory.types";

const BlogCategorySEOSchema = new Schema<TBlogCategorySEO>(
    {
        metaTitle: {
            type: String,
            trim: true,
            maxlength: 60,
            default: ""
        },
        metaDescription: {
            type: String,
            trim: true,
            maxlength: 160,
            default: ""
        }
    },
    { _id: false }
)

const BlogCategorySchema = new Schema<TBlogCategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            maxlength: 300,
            default: ""
        },

        seo: {
            type: BlogCategorySEOSchema,
            default: () => ({})
        },

        position: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const BlogCategory = model<TBlogCategory>("BlogCategory", BlogCategorySchema, "blog_categories")
