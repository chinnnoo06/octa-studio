import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env";
import { authRepository } from "../repositories/auth.repository";
import { HttpError } from "../utils/error";
import { TTokenPayload, TUserPayload } from "../types/user/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: TUserPayload
        }
    }
}

export function auth() {
    return async function (req: Request, res: Response, next: NextFunction) {
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
            return next(new HttpError(403, "No token provided"));
        }

        try {
            const decode = jwt.verify(token, SECRET_KEY) as TTokenPayload;

            const user = await authRepository.findById(decode.id);

            if (!user) {
                throw new HttpError(401, "Invalid token");
            }

            req.user = { id: user._id };

            next();
        } catch (error) {
            next(error instanceof HttpError ? error : new HttpError(401, "Invalid token"));
        }
    };
}
