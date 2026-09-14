import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { BlogCard } from './BlogCard';
import { BLOG_POSTS } from '@/utils/data/blogs';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export const Blogs = () => {
  return (
    <section data-section="blogs" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-5">
          <Eyebrow>Nuestro Blog</Eyebrow>
          <SectionTitle lead="Lo que aprendimos" rotating="montando" />
        </div>

        {/* Carrusel por debajo de `sm`, rejilla desde ahí. Igual que Services. */}
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal
              key={post.href}
              delay={i * 0.1}
              className="w-75 shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        <PrimaryButton href="/blogs">Ver más blogs</PrimaryButton>
      </div>
    </section>
  );
}
