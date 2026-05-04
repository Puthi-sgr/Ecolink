import { useEffect, useMemo } from 'react';

let currentDialogDepth = 0;

export const useDialogStack = (isOpen: boolean) => {
  const depth = useMemo(() => (isOpen ? currentDialogDepth + 1 : 0), [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    currentDialogDepth = Math.max(currentDialogDepth, depth);

    return () => {
      currentDialogDepth = Math.max(0, currentDialogDepth - 1);
    };
  }, [depth, isOpen]);

  return {
    depth,
    zIndex: 50 + depth,
  };
};
