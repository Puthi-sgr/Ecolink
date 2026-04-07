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
    <div className="space-y-4 lg:sticky lg:top-24">
      <div className="hidden lg:block">
        <p className="px-3 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Trip Navigation
        </p>
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center rounded-xl border-l-4 px-3 py-3 text-sm font-medium transition-all ${isActive
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-transparent text-text-muted hover:bg-surface-2 hover:text-text'
                  }`}
              >
                {Icon && (
                  <Icon
                    className={`mr-3 h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'
                      }`}
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="lg:hidden -mx-1 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2 px-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-text-muted hover:border-primary/40 hover:text-text'
                  }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
