import type { NextFunction, Request, Response } from "express";
import { TGetDashboardQuery } from "../types/analytics/analytics.dtos";
import { AnalyticsService } from "../services/analytics.service";

export class AnalyticsController {

    static getDashboard = async (req: Request<{}, {}, {}, TGetDashboardQuery>, res: Response, next: NextFunction) => {
        try {
            const dashboard = await AnalyticsService.getDashboard(req.query.period)

            return res.status(200).json({
                status: "success",
                dashboard
            });

        } catch (error) {
            console.error("Error retrieving the dashboard analytics:", error);
            next(error)
        }
    }

    static getRealtimeUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const activeUsers = await AnalyticsService.getRealtimeUsers()

            return res.status(200).json({
                status: "success",
                activeUsers
            });

        } catch (error) {
            console.error("Error retrieving the realtime users:", error);
            next(error)
        }
    }
}
