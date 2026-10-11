import { EditButton } from '@/components/ui/buttons/EditButton';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { VideosButton } from '@/components/ui/buttons/VideosButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { ImagesCell } from '@/components/ui/table/ImagesCell';
import { VideosCell } from '@/components/ui/table/VideosCell';
import { TextCell } from '@/components/ui/table/TextCell';
import type { TProject } from '@/schemas/project/project.schemas';
import { DeleteProjectButton } from './DeleteProjectButton';

const COLUMNS = ['Imágenes', 'Videos', 'Nombre', 'Descripción', 'Sector', 'Acciones'] as const;

export const ProjectsTable = ({ projects }: { projects: TProject[] }) => {
    if (projects.length === 0) {
        return <TableEmpty>Todavía no hay proyectos. Crea el primero desde el botón de arriba.</TableEmpty>;
    }

    return (
        <Table minWidth="min-w-200">
            <TableHead columns={COLUMNS} />

            <tbody className="text-fourth/75">
                {projects.map((project) => (
                    <TableRow key={project._id}>
                        <td className="p-5 text-sm lg:text-base align-top">
                            <ImagesCell images={project.images} name={project.name} baseUrl={process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <VideosCell videos={project.videos} name={project.name} baseUrl={process.env.NEXT_PUBLIC_PROJECTS_VIDEO_URL!} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top text-secondary font-medium whitespace-nowrap">{project.name}</td>

                        <td className="p-5 text-sm lg:text-base align-top">
                            <TextCell text={project.description} />
                        </td>

                        <td className="p-5 text-sm lg:text-base align-top whitespace-nowrap">{project.sector}</td>

                        <td className="p-5 text-sm lg:text-base align-top text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/proyectos/${project._id}/imagenes`}
                                    label={`Actualizar las imágenes de ${project.name}`}
                                />

                                <VideosButton
                                    href={`/admin/proyectos/${project._id}/videos`}
                                    label={`Actualizar los videos de ${project.name}`}
                                />

                                <EditButton
                                    href={`/admin/proyectos/${project._id}/editar`}
                                    label={`Editar el proyecto ${project.name}`}
                                />

                                <DeleteProjectButton id={project._id} name={project.name} />
                            </span>
                        </td>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};
