import { useState } from 'react'
import { useActionStatus } from '../ui/useActionStatus'
import { TCreateBlogForm, TBlogImageForm, TUpdateBlogForm } from '@/schemas/blogs/blogs.form.schemas'
import { createBlog } from '@/actions/blogs/create-blog-action'
import { updateBlog } from '@/actions/blogs/update-blog-action'
import { deleteBlog } from '@/actions/blogs/delete-blog-action'
import { updateBlogImage } from '@/actions/blogs/update-blog-image-action'

export const useBlogs = () => {
    const createStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const deleteStatus = useActionStatus()

    const [errorCreate, setErrorCreate] = useState<string | null>(null)
    const [successCreate, setSuccessCreate] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const imagesStatus = useActionStatus()

    const [errorImages, setErrorImages] = useState<string | null>(null)
    const [successImages, setSuccessImages] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)

    const handleCreateBlog = async (data: TCreateBlogForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createBlog(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateBlog = async (id: string, data: TUpdateBlogForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateBlog(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateBlogImage = async (id: string, data: TBlogImageForm) => {
        if (imagesStatus.loading) return

        setErrorImages(null)
        setSuccessImages(null)

        imagesStatus.startLoading()

        const res = await updateBlogImage(id, data)

        imagesStatus.stopLoading()

        if (res.error) return setErrorImages(res.error)

        if (res.success) setSuccessImages(res.success)
    }

    const handleDeleteBlog = async (id: string) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteBlog(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createBlog: {
            handleCreateBlog,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateBlog: {
            handleUpdateBlog,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        updateBlogImage: {
            handleUpdateBlogImage,
            loading: imagesStatus.loading,
            error: errorImages,
            success: successImages
        },

        deleteBlog: {
            handleDeleteBlog,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
