import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  padding?: 'default' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  actions,
  padding = 'default'
}) => {
  const paddingClass = padding === 'none' ? '' : 'p-5';

  return (
    <div className={`rounded-eco bg-surface shadow-[0_18px_48px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.2)] ${paddingClass} ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-serif font-semibold text-text">{title}</h3>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
