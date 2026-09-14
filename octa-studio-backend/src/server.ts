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

import authRouter from './routes/auth.routes'
import projectRouter from './routes/project.routes'
import blogRouter from './routes/blog.routes'
import testimonialRouter from './routes/testimonial.routes'

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

server.use(errorHandler);

export default server
