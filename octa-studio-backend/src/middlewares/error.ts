import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/error";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { TMulterFiles } from "../types/multer/multer.types";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  // Si la peticion fallo despues de subir archivos (p. ej. el registro no
  // existe), se borran para no dejar huerfanos en disco.
  deleteAllUploadedFiles(req.files as TMulterFiles | undefined);

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
};
