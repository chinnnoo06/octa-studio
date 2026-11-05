import { Schema } from "mongoose";
import { TSeo } from "../types/common/common.types";
import { META_DESCRIPTION_MAX, META_TITLE_MAX } from "../utils/seo";

/** El servicio de cada entidad siempre completa el SEO con `buildSeo` antes de guardar. */
export const SeoSchema = new Schema<TSeo>(
    {
        metaTitle: {
            type: String,
            required: true,
            trim: true,
            maxlength: META_TITLE_MAX
        },
        metaDescription: {
            type: String,
            required: true,
            trim: true,
            maxlength: META_DESCRIPTION_MAX
        }
    },
    { _id: false }
)
