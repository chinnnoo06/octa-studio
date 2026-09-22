import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/reqValidation";

const router: Router = Router();

// Define routes
router.post("/register",
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.register
)

router.post("/login",
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.login
)

router.get("/session", auth, AuthController.checkAuth);

export default router;
