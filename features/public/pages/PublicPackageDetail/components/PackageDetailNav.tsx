import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PackageDetailNavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface PackageDetailNavProps {
  items: PackageDetailNavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export const PackageDetailNav: React.FC<PackageDetailNavProps> = ({ items, activeId, onNavigate }) => {
  return (
    <div className="sticky top-16 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 md:px-5 xl:px-6">
        <div className="flex justify-center py-3">
          <nav aria-label="Package sections" className="-mx-1 overflow-x-auto">
            <div className="flex min-w-max items-center gap-4 px-1 md:gap-7">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                }}
                className={`group inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-2 text-[13px] font-semibold transition-colors ${isActive
                    ? 'border-primary text-text'
                    : 'border-transparent text-text-muted hover:text-text'
                  }`}
              >
                {Icon && (
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'
                      }`}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
