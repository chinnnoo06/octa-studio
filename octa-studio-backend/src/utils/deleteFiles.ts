import fs from "fs";
import { TMulterFiles } from "../types/multer/multer.types";


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