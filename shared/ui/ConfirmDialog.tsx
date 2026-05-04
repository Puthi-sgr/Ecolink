import React from 'react';
import { Button } from '../atoms/Button';
import { DialogRoot, DialogPanel, DialogHeader, DialogBody, DialogFooter } from './Dialog';
import { DialogSize } from '../types';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  size?: DialogSize;
  children?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  size = 'sm',
  children,
}) => (
  <DialogRoot isOpen={isOpen} onClose={onClose}>
    <DialogPanel size={size}>
      <DialogHeader title={title} description={description} onClose={onClose} />
      <DialogBody className="space-y-4">{children}</DialogBody>
      <DialogFooter className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          className={tone === 'danger' ? 'bg-status-cancelled text-white hover:bg-status-cancelled/90' : ''}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogFooter>
    </DialogPanel>
  </DialogRoot>
);

