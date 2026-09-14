import { model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { TProject, TProjectSEO } from "../types/project/project.types";

const ProjectSEOSchema = new Schema<TProjectSEO>(
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

const ProjectSchema = new Schema<TProject>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    sector: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: (arr: string[]) => arr.length > 0,
            message: "At least one image is required"
        }
    },

    seo: {
        type: ProjectSEOSchema,
        required: true
    },
}, {
    timestamps: true
})

ProjectSchema.plugin(mongoosePaginate);

export const Project = model<TProject, PaginateModel<TProject>>("Project", ProjectSchema, "projects");
