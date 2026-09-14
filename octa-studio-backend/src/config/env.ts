import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI!
export const FRONTEND_URL = process.env.FRONTEND_URL!
export const SECRET_KEY = process.env.SECRET_KEY!
export const PORT = process.env.PORT!
export const IS_DEV = process.env.NODE_ENV === "development"
export const IS_PROD = process.env.NODE_ENV === "production"
export const UPLOADS_PATH = process.env.UPLOADS_PATH || 'uploads'