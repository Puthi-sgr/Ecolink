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
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">Quick Facts</h4>
      <div className="space-y-3">
        {items.map((fact) => (
          <div key={fact.label} className="flex gap-3 pb-3 border-b border-border/60 last:border-b-0 last:pb-0">
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center text-primary">
              {fact.icon ? ICONS[fact.icon] ?? <HelpCircle className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-wider text-text-muted font-semibold">{fact.label}</p>
              <p className="text-sm font-semibold text-text">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
