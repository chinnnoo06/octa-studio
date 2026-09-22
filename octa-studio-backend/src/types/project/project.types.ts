import { HydratedDocument, Types } from "mongoose";

export type TProjectSEO = {
    metaTitle: string,
    metaDescription: string
}

export type TProject = {
    slug: string,
    name: string,
    description: string,
    sector: string,
    images: string[],
    /** Nombres de archivo en uploads/projects/videos. Opcionales, maximo 5. */
    videos: string[],
    seo: TProjectSEO
};

export type TProjectWithID = TProject & { _id: Types.ObjectId }

export type TProjectDocument = HydratedDocument<TProject>
