import { HydratedDocument, Types } from "mongoose";

export type TProject = {
    name: string,
    description: string,
    sector: string,
    images: string[]
};

export type TProjectWithID = TProject & { _id: Types.ObjectId }

export type TProjectDocument = HydratedDocument<TProject>