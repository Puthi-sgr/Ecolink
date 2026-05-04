import React from 'react';

interface SurfaceSectionProps {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const SurfaceSection: React.FC<SurfaceSectionProps> = ({
  title,
  eyebrow,
  actions,
  className = '',
  contentClassName = '',
  children,
}) => (
  <section className={`rounded-[28px] bg-surface p-6 shadow-[0_18px_48px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)] ${className}`}>
    {(title || eyebrow || actions) && (
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          {eyebrow ? <div>{eyebrow}</div> : null}
          {title ? <div className="mt-2 text-xl font-bold font-serif text-text">{title}</div> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    )}
    <div className={`${title || eyebrow || actions ? 'mt-5' : ''} ${contentClassName}`}>
      {children}
    </div>
  </section>
);
