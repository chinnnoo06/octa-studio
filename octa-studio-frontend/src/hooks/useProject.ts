import { useState } from 'react'
import { useActionStatus } from './ui/useActionStatus'
import { TCreateProjectForm, TUpdateProjectForm } from '@/schemas/project/project.form.schemas'
import { createProject } from '@/actions/project/create-project-action'
import { updateProject } from '@/actions/project/update-project-action'
import { deleteProject } from '@/actions/project/delete-project-action'
import { deleteProjects } from '@/actions/project/delete-projects-action'

export const useProject = () => {
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

    const handleDeleteProjects = async (ids: string[]) => {
        if (bulkStatus.loading) return

        setErrorBulk(null)
        setSuccessBulk(null)

        bulkStatus.startLoading()

        const res = await deleteProjects(ids)

        bulkStatus.stopLoading()

        if (res.error) {
            setErrorBulk(res.error)
            return false
        }

        if (res.success) setSuccessBulk(res.success)
        return true
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

        deleteProject: {
            handleDeleteProject,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        },

        deleteProjects: {
            handleDeleteProjects,
            loading: bulkStatus.loading,
            error: errorBulk,
            success: successBulk
        }
    }
}
