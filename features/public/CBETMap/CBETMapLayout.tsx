import React from 'react';

interface CBETMapLayoutProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
}

export const CBETMapLayout: React.FC<CBETMapLayoutProps> = ({ children, overlay }) => (
  <div className="relative h-[700px] w-full bg-surface-2 rounded-xl overflow-hidden border border-border shadow-inner group">
    {children}
    {overlay}
  </div>
);
