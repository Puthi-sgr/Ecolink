import React from 'react';

interface ActionGateProps {
  allowed: boolean;
  mode?: 'disable' | 'hide' | 'fallback';
  fallback?: React.ReactNode;
  children: React.ReactNode | ((state: { disabled: boolean }) => React.ReactNode);
}

export const ActionGate: React.FC<ActionGateProps> = ({
  allowed,
  mode = 'disable',
  fallback = null,
  children,
}) => {
  if (allowed) {
    return <>{typeof children === 'function' ? children({ disabled: false }) : children}</>;
  }

  if (mode === 'hide') {
    return null;
  }

  if (mode === 'fallback') {
    return <>{fallback}</>;
  }

  return <>{typeof children === 'function' ? children({ disabled: true }) : children}</>;
};

