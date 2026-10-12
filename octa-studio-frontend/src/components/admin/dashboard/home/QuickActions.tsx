import { FaCirclePlus } from 'react-icons/fa6';
import { PanelButton } from '@/components/admin/ui/buttons/PanelButton';
import { formatNumber } from '@/utils/admin/formatMetrics';
import { DashCard } from './DashCard';

const ACTIONS = [
    { href: '/admin/blogs/crear', label: 'Añadir Blog' },
    { href: '/admin/proyectos/crear', label: 'Añadir Proyecto' },
    { href: '/admin/testimonios/crear', label: 'Añadir Testimonio' },
];

export const QuickActions = ({ projectsTotal }: { projectsTotal: number | null }) => {
    return (
        <DashCard full title="Acciones rápidas">
            <div className="flex flex-wrap items-center gap-5">
                {ACTIONS.map((action) => (
                    <PanelButton key={action.href} href={action.href}>
                        <FaCirclePlus aria-hidden="true" className="size-4 lg:size-4.5" />
                        {action.label}
                    </PanelButton>
                ))}

                {projectsTotal !== null && (
                    <span className="ml-auto text-sm lg:text-base text-fourth-admin/75">
                        <strong className="text-fourth-admin text-lg lg:text-xl">{formatNumber(projectsTotal)}</strong> proyectos en total
                    </span>
                )}
            </div>
        </DashCard>
    );
};
