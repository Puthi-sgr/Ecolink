import { useEffect } from 'react';

interface UseSmoothScrollToTopOptions {
  behavior?: ScrollBehavior;
}

export const useSmoothScrollToTop = (
  trigger: unknown,
  options: UseSmoothScrollToTopOptions = {}
) => {
  const { behavior = 'smooth' } = options;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  }, [behavior, trigger]);
};
