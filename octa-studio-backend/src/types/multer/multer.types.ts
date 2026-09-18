export type TMulterFiles = {
    projectImages?: Express.Multer.File[]
    /** Imagen destacada del blog: una sola. */
    blogImage?: Express.Multer.File[]
    /** Imagen suelta para el cuerpo de un blog, subida desde el editor. */
    image?: Express.Multer.File[]
}
