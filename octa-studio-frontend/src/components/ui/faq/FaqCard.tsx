'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { accordionPanel } from '@/utils/motion/accordion';
import type { TFaq } from '@/types/content.types';

type TFaqCardProps = {
  item: TFaq;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
};

export const FaqCard = ({ item, isOpen, onToggle, id }: TFaqCardProps) => {
  return (
    <div className="bg-thrird rounded-xl p-5 lg:px-10 lg:py-7.5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        className="text-secondary hover:text-secondary/75 flex w-full cursor-pointer items-center justify-between gap-5 text-left text-lg font-semibold uppercase transition-colors duration-300 lg:text-xl"
      >
        <span>{item.question}</span>

        <span
          aria-hidden="true"
          className={`border-secondary/30 text-secondary flex size-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 lg:size-10 ${
            isOpen ? 'bg-secondary/15 rotate-180' : ''
          }`}
        >
          <FiChevronDown className="size-4 lg:size-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            {...accordionPanel}
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            className="overflow-hidden"
          >
            <p className="text-fourth/75 max-w-3xl pt-5 text-sm leading-relaxed lg:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
