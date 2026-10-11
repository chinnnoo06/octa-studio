import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { TCreateTestimonialForm, TUpdateTestimonialImageForm, TUpdateTestimonialForm } from '@/schemas/testimonial/testimonial.form.schemas'
import { createTestimonial } from '@/actions/testimonial/create-testimonial-action'
import { deleteTestimonial } from '@/actions/testimonial/delete-testimonial-action'
import { updateTestimonial } from '@/actions/testimonial/update-testimonial-action'
import { updateTestimonialImage } from '@/actions/testimonial/update-testimonial-image-action'
import { TTestimonial } from '@/schemas/testimonial/testimonial.schemas'

export const useTestimonial = () => {
    const createStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const imageStatus = useActionStatus()
    const deleteStatus = useActionStatus()

    const [errorCreate, setErrorCreate] = useState<string | null>(null)
    const [successCreate, setSuccessCreate] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const [errorImage, setErrorImage] = useState<string | null>(null)
    const [successImage, setSuccessImage] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)

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

    const handleUpdateTestimonial = async (id: TTestimonial['_id'], data: TUpdateTestimonialForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateTestimonial(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateTestimonialImage = async (id: TTestimonial['_id'], data: TUpdateTestimonialImageForm) => {
        if (imageStatus.loading) return

        setErrorImage(null)
        setSuccessImage(null)

        imageStatus.startLoading()

        const res = await updateTestimonialImage(id, data)

        imageStatus.stopLoading()

        if (res.error) return setErrorImage(res.error)

        if (res.success) setSuccessImage(res.success)
    }

    const handleDeleteTestimonial = async (id: TTestimonial['_id']) => {
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

        updateTestimonialImage: {
            handleUpdateTestimonialImage,
            loading: imageStatus.loading,
            error: errorImage,
            success: successImage
        },

        deleteTestimonial: {
            handleDeleteTestimonial,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
