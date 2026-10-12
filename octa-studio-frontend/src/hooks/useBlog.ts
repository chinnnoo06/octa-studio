import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { TCreateBlogForm, TUpdateBlogForm } from '@/schemas/blog/blog.form.schemas'
import { createBlog } from '@/actions/blog/create-blog-action'
import { updateBlog } from '@/actions/blog/update-blog-action'
import { deleteBlog } from '@/actions/blog/delete-blog-action'
import { deleteBlogs } from '@/actions/blog/delete-blogs-action'

export const useBlog = () => {
    const createStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const deleteStatus = useActionStatus()
    const bulkStatus = useActionStatus()

    const [errorCreate, setErrorCreate] = useState<string | null>(null)
    const [successCreate, setSuccessCreate] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)

    const [errorBulk, setErrorBulk] = useState<string | null>(null)
    const [successBulk, setSuccessBulk] = useState<string | null>(null)

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

    const handleDeleteBlogs = async (ids: string[]) => {
        if (bulkStatus.loading) return

        setErrorBulk(null)
        setSuccessBulk(null)

        bulkStatus.startLoading()

        const res = await deleteBlogs(ids)

        bulkStatus.stopLoading()

        if (res.error) {
            setErrorBulk(res.error)
            return false
        }

        if (res.success) setSuccessBulk(res.success)
        return true
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

        deleteBlog: {
            handleDeleteBlog,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        },

        deleteBlogs: {
            handleDeleteBlogs,
            loading: bulkStatus.loading,
            error: errorBulk,
            success: successBulk
        }
    }
}
