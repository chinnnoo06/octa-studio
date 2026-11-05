"use client";

import { ReactNode, useState } from "react";

export type TModalTriggerProps = {
  renderTrigger: (onOpen: () => void) => ReactNode;
  children: (onClose: () => void, isOpen: boolean) => ReactNode;
};

export const ModalTrigger = ({ renderTrigger, children }: TModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {renderTrigger(() => setIsOpen(true))}
      {children(() => setIsOpen(false), isOpen)}
    </>
  );
};
