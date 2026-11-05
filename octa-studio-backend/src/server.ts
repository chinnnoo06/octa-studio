import morgan from 'morgan'
import express, { Express } from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { connection } from './config/connection'
import { corsOptions } from './config/cors'
import { IS_DEV, UPLOADS_PATH } from './config/env'

import { errorHandler } from './middlewares/error'

import authRouter from './routes/Auth.routes'
import projectRouter from './routes/Project.routes'
import blogRouter from './routes/Blog.routes'
import testimonialRouter from './routes/Testimonial.routes'
import analyticsRouter from './routes/Analytics.routes'
import blogCategoryRouter from './routes/BlogCategory.routes'

import { scheduleOrphanContentImagesCleanup } from './jobs/cleanOrphanContentImages.job'

connection();

const server: Express = express();

server.use(cors(corsOptions))

server.use(express.json());
server.use(cookieParser());

// Serve the uploaded files
const uploadsDir = path.resolve(UPLOADS_PATH);

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

server.use('/files', express.static(uploadsDir));

if (IS_DEV) {
    server.use(morgan('dev'))
}

server.use("/api/auth", authRouter);
server.use("/api/projects", projectRouter);
server.use("/api/blogs", blogRouter);
server.use("/api/testimonials", testimonialRouter);
server.use("/api/analytics", analyticsRouter);
server.use("/api/blog-categories", blogCategoryRouter);

server.use(errorHandler);

scheduleOrphanContentImagesCleanup();

export default server
