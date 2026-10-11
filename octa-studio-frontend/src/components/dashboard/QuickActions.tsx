import { FaCirclePlus } from 'react-icons/fa6';
import { PanelButton } from '@/components/ui/buttons/PanelButton';
import { formatNumber } from '@/utils/formatMetrics';
import { DashCard } from './DashCard';

const ACTIONS = [
    { href: '/admin/blogs/crear', label: 'Añadir Blog' },
    { href: '/admin/proyectos/crear', label: 'Añadir Proyecto' },
    { href: '/admin/testimonios/crear', label: 'Añadir Testimonio' },
];

export const QuickActions = ({ projectsTotal }: { projectsTotal: number | null }) => {
    return (
        <DashCard full title="Acciones rápidas">
            <div className="flex flex-wrap items-center gap-3.75">
                {ACTIONS.map((action) => (
                    <PanelButton key={action.href} href={action.href}>
                        <FaCirclePlus aria-hidden="true" className="size-3.5" />
                        {action.label}
                    </PanelButton>
                ))}

                {projectsTotal !== null && (
                    <span className="ml-auto text-[14px] text-gray-600">
                        <strong className="text-ink text-[18px]">{formatNumber(projectsTotal)}</strong> proyectos en total
                    </span>
                )}
            </div>
        </DashCard>
    );
};
