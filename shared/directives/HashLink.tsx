import React from 'react';
import { setHashPath } from '../utils/hashRoute';

interface HashLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  query?: Record<string, string | undefined>;
}

export const HashLink: React.FC<HashLinkProps> = ({
  to,
  query,
  children,
  onClick,
  ...props
}) => (
  <a
    {...props}
    href={`#${to}`}
    onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      setHashPath(to, query);
    }}
  >
    {children}
  </a>
);

