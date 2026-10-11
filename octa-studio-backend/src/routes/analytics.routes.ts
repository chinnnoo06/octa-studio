import { Router } from "express";
import { query } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/reqValidation";
import { AnalyticsController } from "../controllers/analytics.controller";
import { PERIODS } from "../utils/periods";

const router: Router = Router();

router.get("/dashboard",
    auth,
    query('period').optional().isIn(PERIODS).withMessage('Invalid period'),
    handleInputErrors,
    AnalyticsController.getDashboard
)

router.get("/realtime",
    auth,
    AnalyticsController.getRealtimeUsers
)

export default router;
