import { User } from "../models/User";
import { TRegisterDto } from "../types/auth/auth.dtos";

export const authRepository = {

    async register(data: TRegisterDto) {
        return User.create(data)
    },

    async findById(id: string) {
        return User.findById(id);
    },

    async findByUserName(username: string) {
        return User.findOne({ username })
    }
}
