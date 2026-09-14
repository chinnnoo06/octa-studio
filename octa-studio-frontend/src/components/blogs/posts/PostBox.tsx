import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi';
import type { TBlogPost } from '@/types/content.types';
import ImgAvatar from '@/assets/media/brand/ImgBlueLogo.webp';

/** Tarjeta del listado: foto arriba, titular y, abajo, autoría y fecha. */
export const PostBox = ({ post }: { post: TBlogPost }) => {
  return (
    <Link
      href={post.href}
      className="group border-fourth/30 bg-primary flex h-full flex-col gap-5 overflow-hidden rounded-xl border p-2.5 lg:gap-0 lg:border-0 lg:p-0"
    >
      <div className="overflow-hidden rounded-xl lg:rounded-b-none">
        <Image
          src={post.image}
          alt={post.alt}
          quality={90}
          sizes="(min-width: 1820px) 510px, (min-width: 1024px) calc((100vw - 190px) / 3), (min-width: 640px) calc((100vw - 60px) / 2), calc(100vw - 60px)"
          className="ease-brand h-62.5 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-75 lg:h-87.5"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 lg:gap-10 lg:p-5">
        <h2 className="text-secondary text-xl font-semibold uppercase leading-[1.25] sm:text-[1.375rem] lg:text-2xl">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-3.5">
            <span className="bg-secondary/15 flex size-8.75 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <Image src={ImgAvatar} alt="" sizes="35px" className="size-5 object-contain" />
            </span>

            <span className="text-fourth text-sm lg:text-base">Octa Studio</span>
          </span>

          <span className="text-fourth/75 flex items-center gap-2 text-sm lg:text-base">
            <FiCalendar aria-hidden="true" className="size-4 shrink-0" />
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
};
