import { model, Schema } from "mongoose";
import { TBlogCategory } from "../types/blogCategory/blogCategory.types";
import { SeoSchema } from "./Seo";

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
            required: true,
            trim: true,
            maxlength: 300
        },

        seo: {
            type: SeoSchema,
            required: true
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
