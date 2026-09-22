import { TBlog } from '@/schemas/blogs/blogs.schemas'
import { PostHero } from './PostHero'
import { PostBody } from './PostBody'

export const Post = ({blog} : {blog: TBlog}) => {
    return (
        <section data-section="blog-post" className='flex flex-col gap-10 py-20 lg:py-25 px-5 lg:px-15 mx-auto w-full max-w-7xl'>
            <PostHero blog={blog} />
            <PostBody blog={blog} />
        </section>
    )
}
