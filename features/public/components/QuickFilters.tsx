import React from 'react';
import { Badge } from '../../../shared/atoms/Badge';
import { Clock, Users, Zap, Home, Sun } from 'lucide-react';

interface QuickFiltersProps {
  onFilterChange?: (filter: string) => void;
}

export const QuickFilters: React.FC<QuickFiltersProps> = () => {
  const filterGroups = [
    { label: 'Duration', icon: <Clock className="w-3 h-3" />, options: ['Day Trip', 'Overnight'] },
    { label: 'Capacity', icon: <Users className="w-3 h-3" />, options: ['15-25', '26-40', '41-55+'] },
    { label: 'Level', icon: <Zap className="w-3 h-3" />, options: ['Low', 'Moderate', 'High'] },
    { label: 'Facilities', icon: <Home className="w-3 h-3" />, options: ['Western Toilets', 'Running Water'] },
    { label: 'Season', icon: <Sun className="w-3 h-3" />, options: ['Dry Season', 'All Year'] },
  ];

  return (
    <div className="py-8 border-b border-border bg-surface-2/30">
      <div className="container mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-8 min-w-max">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted flex-none">Quick Filters</span>
          <div className="flex gap-6">
            {filterGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                  {group.icon}
                  {group.label}
                </div>
                <div className="flex gap-1.5">
                  {group.options.map((opt) => (
                    <button 
                      key={opt}
                      className="px-2.5 py-1 text-xs border border-border rounded-md bg-surface hover:border-primary hover:text-primary transition-all whitespace-nowrap"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="text-xs font-medium text-primary hover:underline ml-auto">Clear All</button>
        </div>
      </div>
    </div>
  );
};
