import React from 'react';

interface PublicPackageDetailLayoutProps {
  header?: React.ReactNode;
  hero: React.ReactNode;
  nav: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const PublicPackageDetailLayout: React.FC<PublicPackageDetailLayoutProps> = ({
  header,
  hero,
  nav,
  meta,
  children,
  sidebar
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="py-10 bg-surface">
        <div className="w-full px-5">
          {header && <div className="mb-6">{header}</div>}
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-5">
            <aside className="hidden lg:block">
              {nav}
            </aside>

            <div className="space-y-8">
              {hero}

              <div className="lg:hidden">
                {nav}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  {meta && (
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-text-muted border-b border-border pb-6">
                      {meta}
                    </div>
                  )}
                  {children}
                </div>

                <div className="xl:col-span-1">
                  {sidebar}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
