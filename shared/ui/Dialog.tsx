import React, { RefObject, useRef } from 'react';
import { X } from 'lucide-react';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { useDialogStack } from '../directives/useDialogStack';
import { DialogSize } from '../types';

const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

interface DialogRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocusRef?: RefObject<HTMLElement>;
}

interface DialogPanelProps {
  size?: DialogSize;
  className?: string;
  children: React.ReactNode;
}

interface DialogHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  initialFocusRef?: RefObject<HTMLButtonElement>;
  hideCloseButton?: boolean;
  closeLabel?: string;
}

export const DialogRoot: React.FC<DialogRootProps> = ({
  isOpen,
  onClose,
  children,
  initialFocusRef,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { zIndex } = useDialogStack(isOpen);

  useDialogA11y(
    isOpen,
    dialogRef,
    initialFocusRef as RefObject<HTMLElement> | undefined,
    onClose
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="presentation"
      style={{ zIndex }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" tabIndex={-1} className="outline-none">
        {children}
      </div>
    </div>
  );
};

export const DialogPanel: React.FC<
  DialogPanelProps
> = ({ size = 'md', className = '', children }) => (
  <div
    className={`relative w-[calc(100vw-2rem)] ${sizeClasses[size]} overflow-hidden rounded-[28px] bg-white/92 shadow-[0_28px_72px_rgba(25,28,29,0.12)] ring-1 ring-[rgba(194,198,212,0.18)] backdrop-blur-xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 ${className}`}
  >
    {children}
  </div>
);

export const DialogHeader: React.FC<
  DialogHeaderProps
> = ({
  title,
  description,
  onClose,
  initialFocusRef,
  hideCloseButton = false,
  closeLabel = 'Close dialog',
}) => (
  <div className="bg-surface-2/90 p-6">
    <div className="flex items-start justify-between gap-3">
      <div>
        {title ? <h3 className="font-bold font-serif text-xl text-text">{title}</h3> : null}
        {description ? <p className="mt-1 text-sm text-text-muted">{description}</p> : null}
      </div>
      {!hideCloseButton && onClose ? (
        <button
          ref={initialFocusRef}
          type="button"
          autoFocus={!initialFocusRef}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  </div>
);

export const DialogBody: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => <div className={`bg-white p-6 ${className}`}>{children}</div>;

export const DialogFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => <div className={`bg-surface-2/90 p-6 ${className}`}>{children}</div>;
