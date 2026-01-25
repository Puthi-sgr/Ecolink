import React from 'react';

interface PublicPackageDetailLayoutProps {
  header?: React.ReactNode;
  hero: React.ReactNode;
  nav: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const PublicPackageDetailLayout: React.FC<PublicPackageDetailLayoutProps> = ({
  header,
  hero,
  nav,
  children,
  sidebar
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-6">
          {header && <div className="mb-6">{header}</div>}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-8">
              {hero}
              {nav}
              {children}
            </div>
            <div className="lg:w-96">
              {sidebar}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
