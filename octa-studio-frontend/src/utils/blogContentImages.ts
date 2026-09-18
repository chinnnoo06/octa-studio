/**
 * Las imagenes del contenido de un blog se guardan con ruta relativa al
 * backend (`/files/blogs/content/...`), asi que al pintarlas en la web o
 * cargarlas en el editor hay que completarlas con el origen del backend.
 * Al guardar, el backend vuelve a dejarlas relativas.
 */

// NEXT_PUBLIC_BLOGS_IMAGE_URL es `<backend>/files/blogs`; de ahi sale el origen.
const FILES_ORIGIN = new URL(process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL as string).origin;

export const withAbsoluteContentImages = (html: string) =>
  html.replace(/src="\/files\//g, `src="${FILES_ORIGIN}/files/`);
