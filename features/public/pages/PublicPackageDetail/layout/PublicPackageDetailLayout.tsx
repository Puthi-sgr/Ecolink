import React from 'react';

interface PublicPackageDetailLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const PublicPackageDetailLayout: React.FC<PublicPackageDetailLayoutProps> = ({ header, children, sidebar }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {header}

      <section className="py-12 bg-surface">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-12">
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
