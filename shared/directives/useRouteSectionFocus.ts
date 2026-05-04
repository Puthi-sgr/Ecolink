import { RefObject, useEffect } from 'react';

export const useRouteSectionFocus = (
  ref: RefObject<HTMLElement>,
  trigger: unknown,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return;

    ref.current?.focus();
  }, [enabled, ref, trigger]);
};

