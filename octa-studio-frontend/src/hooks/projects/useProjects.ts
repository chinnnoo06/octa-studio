import { useState } from 'react'
import { useActionStatus } from '../ui/useActionStatus'
import { TCreateProjectForm, TProjectImagesForm, TProjectVideosForm, TUpdateProjectForm } from '@/schemas/projects/projects.form.schemas'
import { createProject } from '@/actions/projects/create-project-action'
import { updateProject } from '@/actions/projects/update-project-action'
import { deleteProject } from '@/actions/projects/delete-project-action'
import { updateProjectImages } from '@/actions/projects/update-project-images-action'
import { updateProjectVideos } from '@/actions/projects/update-project-videos-action'

export const useProjects = () => {
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

    const videosStatus = useActionStatus()

    const [errorVideos, setErrorVideos] = useState<string | null>(null)
    const [successVideos, setSuccessVideos] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)

    const handleCreateProject = async (data: TCreateProjectForm) => {
        if (createStatus.loading) return

        setErrorCreate(null)
        setSuccessCreate(null)

        createStatus.startLoading()

        const res = await createProject(data)

        createStatus.stopLoading()

        if (res.error) return setErrorCreate(res.error)

        if (res.success) setSuccessCreate(res.success)
    }

    const handleUpdateProject = async (id: string, data: TUpdateProjectForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateProject(id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleUpdateProjectImages = async (id: string, data: TProjectImagesForm) => {
        if (imagesStatus.loading) return

        setErrorImages(null)
        setSuccessImages(null)

        imagesStatus.startLoading()

        const res = await updateProjectImages(id, data)

        imagesStatus.stopLoading()

        if (res.error) return setErrorImages(res.error)

        if (res.success) setSuccessImages(res.success)
    }

    const handleUpdateProjectVideos = async (id: string, data: TProjectVideosForm) => {
        if (videosStatus.loading) return

        setErrorVideos(null)
        setSuccessVideos(null)

        videosStatus.startLoading()

        const res = await updateProjectVideos(id, data)

        videosStatus.stopLoading()

        if (res.error) return setErrorVideos(res.error)

        if (res.success) setSuccessVideos(res.success)
    }

    const handleDeleteProject = async (id: string) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteProject(id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        createProject: {
            handleCreateProject,
            loading: createStatus.loading,
            error: errorCreate,
            success: successCreate
        },

        updateProject: {
            handleUpdateProject,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        updateProjectImages: {
            handleUpdateProjectImages,
            loading: imagesStatus.loading,
            error: errorImages,
            success: successImages
        },

        updateProjectVideos: {
            handleUpdateProjectVideos,
            loading: videosStatus.loading,
            error: errorVideos,
            success: successVideos
        },

        deleteProject: {
            handleDeleteProject,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
