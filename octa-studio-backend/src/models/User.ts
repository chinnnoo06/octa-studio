import { Schema, model } from "mongoose";
import { TUser } from "../types/user/user.types";

const UserSchema = new Schema<TUser>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export const User = model<TUser>("User", UserSchema, "users");