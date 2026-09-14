import bcrypt from "bcrypt";
import { HttpError } from "../utils/error";
import { authRepository } from "../repositories/auth.repository";
import { TLoginDto, TRegisterDto } from "../types/auth/auth.dtos";
import { TSession } from "../types/auth/auth.types";
import { generateJWT } from "../utils/jwt";

export const authService = {

    async register(data: TRegisterDto) {
        const userExist = await authRepository.findByUserName(data.username)

        if (userExist) throw new HttpError(409, "This user is already registered");

        const pwd = await bcrypt.hash(data.password, 10);

        const user = await authRepository.register({
            ...data,
            password: pwd
        })

        return user
    },

    async login(data: TLoginDto): Promise<TSession> {
        const userExists = await authRepository.findByUserName(data.username)

        if (!userExists) throw new HttpError(409, "Invalid credentials");

        const pwd = bcrypt.compareSync(data.password, userExists.password)

        if (!pwd) throw new HttpError(409, "Invalid credentials");

        const token = generateJWT({ id: userExists._id })

        return { token }
    }
}
