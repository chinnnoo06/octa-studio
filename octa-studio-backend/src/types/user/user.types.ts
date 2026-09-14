import { Types } from "mongoose";

export type TUser = {
    username: string,
    password: string
};

export type TUserWithID = TUser & { _id: Types.ObjectId }

export type TUserPayload = {
    id: Types.ObjectId
}

export type TTokenPayload = {
    id: string
}
