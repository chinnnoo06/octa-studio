import { HiArrowUpRight } from 'react-icons/hi2';
import { CHANNEL_ICONS } from './channelIcons';
import type { TChannel } from '@/types/content.types';

type TChannelCardProps = {
  channel: TChannel;
  variant: 'dark' | 'tint' | 'white';
};

const BOX: Record<TChannelCardProps['variant'], string> = {
  dark: 'bg-secondary',
  tint: 'bg-secondary/15',
  white: 'bg-primary border border-fourth/30',
};

export const ChannelCard = ({ channel, variant }: TChannelCardProps) => {
  const light = variant === 'dark';
  const Icon = CHANNEL_ICONS[channel.id];
  const [primary] = channel.links;
  const external = primary.href.startsWith('http');

  // La insignia cambia de fondo segun la baldosa: clara sobre oscuro, blanca sobre tinte, tinte sobre blanco.
  const badge = light
    ? 'bg-primary/15 text-primary'
    : variant === 'tint'
      ? 'bg-primary text-secondary'
      : 'bg-secondary/15 text-secondary';

  return (
    <div
      className={`flex h-full flex-col gap-10 rounded-xl p-5 scroll-mt-24 lg:p-10 ${BOX[variant]}`}
    >
      <div className="flex items-center justify-between gap-5">
        <span
          aria-hidden="true"
          className={`flex size-10 shrink-0 items-center justify-center rounded-full lg:size-12 ${badge}`}
        >
          <Icon className="size-5 lg:size-6" />
        </span>

        <a
          href={primary.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border px-4 transition-colors duration-300 lg:h-12 lg:px-5 ${light ? 'border-primary text-primary hover:bg-primary hover:text-secondary' : 'border-secondary text-secondary hover:bg-secondary hover:text-primary'}`}
        >
          <span className="text-sm lg:text-base font-medium">{channel.action}</span>
          <HiArrowUpRight aria-hidden="true" className="size-4 lg:size-4.5 stroke-1" />
        </a>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3
          className={`font-gentleman text-5xl lg:text-6xl p-1.5 leading-[0.7] font-normal tracking-[0.04em] normal-case ${light ? 'text-primary' : 'text-secondary'}`}
        >
          {channel.name}
        </h3>

        <p className={`text-sm lg:text-base ${light ? 'text-primary/75' : 'text-fourth/75'}`}>
          {channel.description}
        </p>
      </div>

      <ul role="list" className="mt-auto flex flex-col">
        {channel.links.map((link) => {
          const isExternal = link.href.startsWith('http');

          return (
            <li
              key={link.href}
              className={`border-t ${light ? 'border-primary/30' : 'border-fourth/30'}`}
            >
              <a
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group flex flex-col gap-1 py-5"
              >
                <span className={`text-sm lg:text-base font-medium ${light ? 'text-primary/75' : 'text-secondary'}`}>
                  {link.label}
                </span>

                {/* El hover cambia color, como en FooterContact; el sitio no usa opacidad para eso. */}
                <span
                  className={`text-xl lg:text-2xl font-semibold wrap-break-words transition-colors duration-300 ${light ? 'text-primary group-hover:text-primary/75' : 'text-secondary group-hover:text-secondary/75'}`}
                >
                  {link.value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
