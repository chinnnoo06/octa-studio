import { useState } from 'react'
import { useActionStatus } from '../ui/useActionStatus'
import { TTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas'
import { createTestimonial } from '@/actions/testimonials/create-testimonial-action'
import { deleteTestimonial } from '@/actions/testimonials/delete-testimonial-action'
import { updateTestimonial } from '@/actions/testimonials/update-testimonial-action'
import { TTestiomonial } from '@/schemas/testimonials/testimonials.schemas'

export const useTestimonials = () => {
     const createStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const deleteStatus = useActionStatus()

    const [errorCreate, setErrorCreate] = useState<string | null>(null)
    const [successCreate, setSuccessCreate] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)

     const handleCreateTestimonial = async (data: TTestimonialForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createTestimonial(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateTestimonial = async (id: TTestiomonial['_id'], data: TTestimonialForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateTestimonial(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleDeleteTestimonial = async (id: TTestiomonial['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteTestimonial(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createTestimonial: {
            handleCreateTestimonial,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateTestimonial: {
            handleUpdateTestimonial,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        deleteTestimonial: {
            handleDeleteTestimonial,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
