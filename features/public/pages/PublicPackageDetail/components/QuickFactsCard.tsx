import React from 'react';
import { Home, Mountain, ShieldCheck, Sun, Users, HelpCircle } from 'lucide-react';

export interface QuickFactItem {
  label: string;
  value: string;
  icon?: string;
}

interface QuickFactsCardProps {
  items: QuickFactItem[];
}

const ICONS: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  mountain: <Mountain className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />
};

export const QuickFactsCard: React.FC<QuickFactsCardProps> = ({ items }) => {
  return (
    <div className="border-y border-border/70 py-5">
      <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Quick Facts</h4>
      <div className="divide-y divide-border/65">
        {items.map((fact) => (
          <div key={fact.label} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary">
              {fact.icon ? ICONS[fact.icon] ?? <HelpCircle className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{fact.label}</p>
              <p className="mt-1 text-sm font-semibold text-text">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
