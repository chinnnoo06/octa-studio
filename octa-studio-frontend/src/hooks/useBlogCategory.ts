import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { TBlogCategoryForm } from '@/schemas/blogCategory/blogCategory.form.schemas'
import { createBlogCategory } from '@/actions/blogCategory/create-blog-category-action'
import { updateBlogCategory } from '@/actions/blogCategory/update-blog-category-action'
import { deleteBlogCategory } from '@/actions/blogCategory/delete-blog-category-action'
import { deleteBlogCategories } from '@/actions/blogCategory/delete-blog-categories-action'

export const useBlogCategory = () => {
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

    const handleCreateBlogCategory = async (data: TBlogCategoryForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createBlogCategory(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateBlogCategory = async (id: string, data: TBlogCategoryForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateBlogCategory(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleDeleteBlogCategory = async (id: string) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteBlogCategory(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    const handleDeleteBlogCategories = async (ids: string[]) => {
        if (bulkStatus.loading) return

        setErrorBulk(null)
        setSuccessBulk(null)

        bulkStatus.startLoading()

        const res = await deleteBlogCategories(ids)

        bulkStatus.stopLoading()

        if (res.error) {
            setErrorBulk(res.error)
            return false
        }

        if (res.success) setSuccessBulk(res.success)
        return true
    }

    return {
        createBlogCategory: {
            handleCreateBlogCategory,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateBlogCategory: {
            handleUpdateBlogCategory,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        deleteBlogCategory: {
            handleDeleteBlogCategory,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        },

        deleteBlogCategories: {
            handleDeleteBlogCategories,
            loading: bulkStatus.loading,
            error: errorBulk,
            success: successBulk
        }
    }
}
