import type { NextFunction, Request, Response } from "express"
import { TLoginDto, TRegisterDto } from "../types/auth/auth.dtos";
import { authService } from "../services/auth.service";
import { IS_PROD } from "../config/env";

export class AuthController {

    static register = async (req: Request<{}, unknown, TRegisterDto>, res: Response, next: NextFunction) => {
        if (IS_PROD) {
            return res.status(404).end()
        }

        const params = req.body;

        try {
            await authService.register(params)

            return res.status(200).json({
                status: "success",
                message: "User Successfully Registered"
            });
        } catch (error) {
            console.log("Error creating account");
            next(error)
        }
    }

    static login = async (req: Request<{}, unknown, TLoginDto>, res: Response, next: NextFunction) => {
        const params = req.body;

        try {
            const sessionInfo = await authService.login(params)

            return res.status(200).json({
                status: "success",
                message: "Login Successful",
                token: sessionInfo.token
            });
        } catch (error) {
            console.log("Error logging in", error);
            next(error)
        }
    }

    // If the auth() middleware let the request through, the session is valid.
    static checkAuth = (req: Request, res: Response) => {
        return res.status(200).json({
            status: "success"
        });
    }
}
