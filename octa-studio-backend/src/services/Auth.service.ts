import bcrypt from "bcrypt";
import { HttpError } from "../utils/error";
import { AuthRepository } from "../repositories/Auth.repository";
import { TLoginDto, TRegisterDto } from "../types/auth/auth.dtos";
import { TSession } from "../types/auth/auth.types";
import { generateJWT } from "../utils/jwt";

export class AuthService {

    static async register(data: TRegisterDto) {
        const userExist = await AuthRepository.findByUserName(data.username)

        if (userExist) throw new HttpError(409, "This user is already registered");

        const pwd = await bcrypt.hash(data.password, 10);

        const user = await AuthRepository.register({
            ...data,
            password: pwd
        })

        return user
    }

    static async login(data: TLoginDto): Promise<TSession> {
        const userExists = await AuthRepository.findByUserName(data.username)

        if (!userExists) throw new HttpError(409, "Invalid credentials");

        const pwd = bcrypt.compareSync(data.password, userExists.password)

        if (!pwd) throw new HttpError(409, "Invalid credentials");

        const token = generateJWT({ id: userExists._id })

        return { token }
    }
}
