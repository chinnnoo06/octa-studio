import { HydratedDocument } from "mongoose";
import { TSeo } from "../common/common.types";

export type TProject = {
    slug: string,
    name: string,
    description: string,
    sector: string,
    images: string[],
    videos: string[],
    seo: TSeo
};

export type TProjectDocument = HydratedDocument<TProject>
