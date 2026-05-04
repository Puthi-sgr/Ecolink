import React from 'react';
import { useDisclosure } from './useDisclosure';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface ConfirmActionProps {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  onConfirm: () => void;
  dialogBody?: React.ReactNode;
  children: (trigger: { onClick: () => void }) => React.ReactNode;
}

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  tone,
  onConfirm,
  dialogBody,
  children,
}) => {
  const disclosure = useDisclosure(false);

  return (
    <>
      {children({ onClick: disclosure.open })}
      <ConfirmDialog
        isOpen={disclosure.isOpen}
        onClose={disclosure.close}
        onConfirm={() => {
          onConfirm();
          disclosure.close();
        }}
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        tone={tone}
      >
        {dialogBody}
      </ConfirmDialog>
    </>
  );
};
