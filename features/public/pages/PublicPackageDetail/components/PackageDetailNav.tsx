import React from 'react';
import { Compass } from 'lucide-react';

interface PackageDetailNavItem {
  id: string;
  label: string;
}

interface PackageDetailNavProps {
  items: PackageDetailNavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  meta?: React.ReactNode;
}

export const PackageDetailNav: React.FC<PackageDetailNavProps> = ({ items, activeId, onNavigate, meta }) => {
  return (
    <div className="sticky top-16 z-20">
      <div className="bg-white border-b border-border pb-4 pt-2 rounded-b-2xl shadow-sm">
        {meta && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-muted mb-3">
            {meta}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`pb-3 pt-2 text-sm font-semibold transition-colors border-b-2 -mb-px ${isActive
                    ? 'text-text border-primary'
                    : 'text-text-muted border-transparent hover:text-text'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
