import { EditButton } from '@/components/ui/buttons/EditButton';
import { ImagesButton } from '@/components/ui/buttons/ImagesButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import type { TProject } from '@/schemas/projects/projects.schemas';
import { DeleteProjectButton } from './DeleteProjectButton';
import { DescriptionCell } from './DescriptionCell';
import { ProjectImages } from './ProjectImages';

const COLUMNS = ['Imágenes', 'Nombre', 'Descripción', 'Sector', 'Acciones'] as const;

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
                        <td className="px-5 py-4 text-sm lg:text-base align-top">
                            <ProjectImages images={project.images} name={project.name} />
                        </td>

                        <td className={`px-5 py-4 text-sm lg:text-base align-top text-secondary font-medium`}>{project.name}</td>

                        <td className="px-5 py-4 text-sm lg:text-base align-top">
                            <DescriptionCell description={project.description} />
                        </td>

                        <td className={`px-5 py-4 text-sm lg:text-base align-top whitespace-nowrap`}>{project.sector}</td>

                        <td className={`px-5 py-4 text-sm lg:text-base align-top text-right whitespace-nowrap`}>
                            <span className="inline-flex items-center gap-2.5">
                                <ImagesButton
                                    href={`/admin/proyectos/${project._id}/imagenes`}
                                    label={`Actualizar las imágenes de ${project.name}`}
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
