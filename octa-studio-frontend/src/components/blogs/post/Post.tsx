import { TBlog } from '@/schemas/blog/blog.schemas'
import { PostHero } from './PostHero'
import { PostBody } from './PostBody'

export const Post = ({blog} : {blog: TBlog}) => {
    return (
        <section id="blog-contenido" data-section="blog-contenido" className='scroll-mt-18 flex flex-col gap-10 py-15 lg:py-20 px-5 lg:px-15 mx-auto w-full max-w-7xl'>
            <PostHero blog={blog} />
            <PostBody blog={blog} />
        </section>
    )
}
