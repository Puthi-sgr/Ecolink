import React from 'react';

interface PublicPackageDetailLayoutProps {
  header?: React.ReactNode;
  nav: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const PublicPackageDetailLayout: React.FC<PublicPackageDetailLayoutProps> = ({
  header,
  nav,
  meta,
  children,
  sidebar
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {nav}
      <section className="py-8 bg-surface">
        <div className="container mx-auto px-4 md:px-5 xl:px-6">
          {header && <div className="mb-6">{header}</div>}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <div className="space-y-8">
                {meta && (
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-text-muted border-b border-border pb-6">
                    {meta}
                  </div>
                )}
                {children}
              </div>
            </div>

            <div className="xl:col-span-1">
              {sidebar}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
