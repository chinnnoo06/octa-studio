import { FaHammer } from 'react-icons/fa6';
import { EditButton } from '@/components/ui/buttons/EditButton';
import { Table } from '@/components/ui/table/Table';
import { TableHead, type TTableColumn } from '@/components/ui/table/TableHead';
import { TableRow } from '@/components/ui/table/TableRow';
import { TableCell } from '@/components/ui/table/TableCell';
import { TableEmpty } from '@/components/ui/table/TableEmpty';
import { TableCard, TableCardList } from '@/components/ui/table/TableCards';
import { ImagesCell } from '@/components/ui/table/ImagesCell';
import { VideosCell } from '@/components/ui/table/VideosCell';
import { TextCell } from '@/components/ui/table/TextCell';
import { StatusBadge } from '@/components/ui/table/StatusBadge';
import { BulkCheckbox, BulkSelectionProvider } from '@/components/ui/table/BulkSelection';
import type { TProject } from '@/schemas/project/project.schemas';
import type { TAdminListParams } from '@/types/common.types';
import { formatShortDate } from '@/utils/formatDate';
import { DeleteProjectButton } from './DeleteProjectButton';
import { BulkDeleteProjects } from './BulkDeleteProjects';

const COLUMNS: TTableColumn[] = [
    { label: 'Portada', align: 'center' },
    { label: 'Nombre', sortKey: 'name' },
    'Descripción',
    { label: 'Sector', sortKey: 'sector' },
    'Videos',
    { label: 'Creado', sortKey: 'createdAt' },
    'Acciones',
];

const IMAGE_URL = process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL!;
const VIDEO_URL = process.env.NEXT_PUBLIC_PROJECTS_VIDEO_URL!;

type TProjectsTableProps = {
    projects: TProject[];
    basePath: string;
    params: TAdminListParams;
    filtered: boolean;
};

const Actions = ({ project }: { project: TProject }) => (
    <>
        <EditButton href={`/admin/proyectos/${project._id}/editar`} label={`Editar el proyecto ${project.name}`} />
        <DeleteProjectButton id={project._id} name={project.name} />
    </>
);

export const ProjectsTable = ({ projects, basePath, params, filtered }: TProjectsTableProps) => {
    if (projects.length === 0) {
        return filtered ? (
            <TableEmpty title="Sin resultados" icon={FaHammer}>Ningún proyecto coincide con la búsqueda o los filtros.</TableEmpty>
        ) : (
            <TableEmpty title="No hay proyectos" icon={FaHammer}>Aún no hay proyectos. ¡Crea el primero!</TableEmpty>
        );
    }

    return (
        <BulkSelectionProvider ids={projects.map((project) => project._id)}>
            <Table minWidth="min-w-250">
                <TableHead columns={COLUMNS} selectable sorting={{ basePath, params }} />

                <tbody>
                    {projects.map((project) => (
                        <TableRow key={project._id}>
                            <TableCell variant="select">
                                <BulkCheckbox id={project._id} label={`Seleccionar ${project.name}`} />
                            </TableCell>

                            <TableCell variant="image">
                                <ImagesCell images={project.images} name={project.name} baseUrl={IMAGE_URL} />
                            </TableCell>

                            <TableCell className="whitespace-nowrap"><strong className="font-semibold">{project.name}</strong></TableCell>

                            <TableCell><TextCell text={project.description} /></TableCell>

                            <TableCell><StatusBadge>{project.sector}</StatusBadge></TableCell>

                            <TableCell>
                                <VideosCell videos={project.videos} name={project.name} baseUrl={VIDEO_URL} />
                            </TableCell>

                            <TableCell className="whitespace-nowrap">{project.createdAt ? formatShortDate(project.createdAt) : '—'}</TableCell>

                            <TableCell variant="actions">
                                <div className="inline-flex items-center justify-end gap-1">
                                    <Actions project={project} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <TableCardList>
                {projects.map((project) => (
                    <TableCard
                        key={project._id}
                        id={project._id}
                        selectLabel={`Seleccionar ${project.name}`}
                        title={project.name}
                        media={<ImagesCell images={project.images} name={project.name} baseUrl={IMAGE_URL} />}
                        meta={[{ label: 'Sector', value: project.sector }]}
                        extra={<VideosCell videos={project.videos} name={project.name} baseUrl={VIDEO_URL} />}
                        date={project.createdAt ? formatShortDate(project.createdAt) : undefined}
                        actions={<Actions project={project} />}
                    />
                ))}
            </TableCardList>

            <BulkDeleteProjects />
        </BulkSelectionProvider>
    );
};
