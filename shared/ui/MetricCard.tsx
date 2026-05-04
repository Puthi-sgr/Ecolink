import React from 'react';
import { Badge } from '../atoms/Badge';

interface MetricCardProps {
  label: string;
  value: number | string;
  tone?: 'default' | 'primary' | 'accent' | 'warning';
  helper?: string;
}

const toneClassMap = {
  default: 'text-text',
  primary: 'text-primary',
  accent: 'text-accent',
  warning: 'text-clay',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  tone = 'default',
  helper,
}) => (
  <div className="rounded-[24px] bg-surface p-5 shadow-[0_18px_48px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)]">
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{label}</p>
    <p className={`mt-2 text-3xl font-bold ${toneClassMap[tone]}`}>{value}</p>
    {helper ? (
      <div className="mt-3">
        <Badge variant="surface" size="sm">
          {helper}
        </Badge>
      </div>
    ) : null}
  </div>
);
