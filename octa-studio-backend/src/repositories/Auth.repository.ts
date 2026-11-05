import { User } from "../models/User";
import { TRegisterDto } from "../types/auth/auth.dtos";

export class AuthRepository {

    static async register(data: TRegisterDto) {
        return User.create(data)
    }

    static async findById(id: string) {
        return User.findById(id);
    }

    static async findByUserName(username: string) {
        return User.findOne({ username })
    }
}
