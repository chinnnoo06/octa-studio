import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { TCreateTestimonialForm, TUpdateTestimonialForm } from '@/schemas/testimonial/testimonial.form.schemas'
import { createTestimonial } from '@/actions/testimonial/create-testimonial-action'
import { updateTestimonial } from '@/actions/testimonial/update-testimonial-action'
import { deleteTestimonial } from '@/actions/testimonial/delete-testimonial-action'
import { deleteTestimonials } from '@/actions/testimonial/delete-testimonials-action'

export const useTestimonial = () => {
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

    const handleCreateTestimonial = async (data: TCreateTestimonialForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createTestimonial(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateTestimonial = async (id: string, data: TUpdateTestimonialForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateTestimonial(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleDeleteTestimonial = async (id: string) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteTestimonial(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    const handleDeleteTestimonials = async (ids: string[]) => {
        if (bulkStatus.loading) return

        setErrorBulk(null)
        setSuccessBulk(null)

        bulkStatus.startLoading()

        const res = await deleteTestimonials(ids)

        bulkStatus.stopLoading()

        if (res.error) {
            setErrorBulk(res.error)
            return false
        }

        if (res.success) setSuccessBulk(res.success)
        return true
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
        },

        deleteTestimonials: {
            handleDeleteTestimonials,
            loading: bulkStatus.loading,
            error: errorBulk,
            success: successBulk
        }
    }
}
