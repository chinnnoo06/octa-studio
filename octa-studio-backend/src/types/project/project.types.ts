import { HydratedDocument, Types } from "mongoose";

export type TProjectSEO = {
    metaTitle: string,
    metaDescription: string
}

export type TProject = {
    name: string,
    description: string,
    sector: string,
    images: string[],
    seo: TProjectSEO
};

export type TProjectWithID = TProject & { _id: Types.ObjectId }

export type TProjectDocument = HydratedDocument<TProject>
