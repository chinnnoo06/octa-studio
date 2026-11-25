import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env";
import { AuthRepository } from "../repositories/Auth.repository";
import { HttpError } from "../utils/error";
import { TTokenPayload, TUserPayload } from "../types/user/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: TUserPayload
        }
    }
}

export const auth = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | null = null;

        if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token && req.headers.authorization) {
            const bearer = req.headers.authorization;
            if (bearer.startsWith("Bearer ")) {
                token = bearer.split(" ")[1];
            }
        }

        if (!token) {
            throw new HttpError(401, "No hay token");
        }

        const decode = jwt.verify(token, SECRET_KEY) as TTokenPayload;

        const user = await AuthRepository.findById(decode.id);

        if (!user) {
            throw new HttpError(401, "Token inválido");
        }

        req.user = { id: user._id };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new HttpError(401, "Token inválido"));
        }
        next(error);
    }
};