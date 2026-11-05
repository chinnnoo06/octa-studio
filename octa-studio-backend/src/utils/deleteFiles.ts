import fs from "fs";
import path from "path";
import { TMulterFiles } from "../types/multer/multer.types";

/** Borra archivos ya persistidos (por nombre, en el directorio de la entidad). */
export const deleteFilesByName = (dir: string, names: string[]) => {
    names.forEach(name => {
        try {
            fs.unlinkSync(path.join(dir, name))
            console.log(`Deleted: ${name}`);
        } catch (err) {
            console.error(`Error deleting ${name}`)
        }
    })
}

export const deleteSingleUploadedFile = (file: Express.Multer.File) => {
  if (!file) return;

  try {

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    console.log("Deleted:", file.path);

  } catch (err) {
    console.error(err);
  }
};

export const deleteAllUploadedFiles = (files?: TMulterFiles) => {

    if (!files) return

    Object.values(files).forEach((arr) => {

        arr?.forEach((file) => {
            deleteSingleUploadedFile(file)
        })

    })
}