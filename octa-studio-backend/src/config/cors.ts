import { CorsOptions } from "cors";
import { FRONTEND_URL } from "./env";

export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {

        const whiteList = [FRONTEND_URL]
        if (!origin) {
            return callback(null, true)
        }

        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            console.log("❌ CORS blocked:", origin)
            callback(new Error("CORS error"))
        }
    },
    credentials: true
}