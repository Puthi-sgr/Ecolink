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
      <section className="bg-background py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-5 xl:px-6">
          {header && <div className="mb-7">{header}</div>}
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="min-w-0 space-y-10">
              {meta && (
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {meta}
                </div>
              )}
              <div className="space-y-10">{children}</div>
            </div>

            <aside className="xl:col-span-1">{sidebar}</aside>
          </div>
        </div>
      </section>
    </div>
  );
};
