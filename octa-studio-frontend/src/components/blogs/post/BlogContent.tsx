import { withAbsoluteContentImages } from '@/utils/blogContentImages';

const PROSE = [
  'text-fourth/75 text-base lg:text-lg flex flex-col gap-5',
  '[&_h2]:text-secondary [&_h2]:text-xl [&_h2]:lg:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:mt-5',
  '[&_h3]:text-secondary [&_h3]:text-lg [&_h3]:lg:text-xl [&_h3]:font-bold [&_h3]:uppercase',
  '[&_h4]:text-secondary [&_h4]:text-base [&_h4]:lg:text-lg [&_h4]:font-semibold',
  '[&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4',
  '[&_strong]:text-fourth [&_strong]:font-semibold',
  '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mb-2',
  '[&_blockquote]:border-secondary [&_blockquote]:border-l-4 [&_blockquote]:pl-5 [&_blockquote]:text-secondary [&_blockquote]:font-medium',
  // Mismo tope de ancho que la imagen principal de la entrada.
  '[&_img]:rounded-xl [&_img]:w-full [&_img]:max-w-6xl [&_img]:aspect-video [&_img]:object-cover',
  '[&_hr]:border-fourth/30',
  '[&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:text-secondary [&_th]:font-semibold [&_th]:border-b [&_th]:border-fourth/30 [&_th]:p-2.5 [&_td]:border-b [&_td]:border-fourth/30 [&_td]:p-2.5',
].join(' ');

export const BlogContent = ({ html }: { html: string }) => {
  const absolute = withAbsoluteContentImages(html);

  return <div className={PROSE} dangerouslySetInnerHTML={{ __html: absolute }} />;
};
