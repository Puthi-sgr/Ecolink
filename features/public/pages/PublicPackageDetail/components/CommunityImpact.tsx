import React from 'react';

interface ImpactItem {
  label: string;
  value: number;
  color?: string;
}

interface CommunityImpactProps {
  title: string;
  subtitle?: string;
  breakdown: ImpactItem[];
  localLabel?: string;
}

const COLOR_MAP: Record<string, string> = {
  amber: 'var(--color-clay)',
  primary: 'var(--color-primary)',
  emerald: 'var(--color-primary-600)'
};

const resolveColor = (color?: string) => {
  if (!color) return COLOR_MAP.primary;
  return COLOR_MAP[color] ?? color;
};

const buildConicGradient = (items: ImpactItem[]) => {
  const filtered = items.filter((item) => item.value > 0);
  const total = filtered.reduce((sum, item) => sum + item.value, 0);
  if (!total) {
    return 'conic-gradient(var(--color-border) 0% 100%)';
  }

  let cursor = 0;
  const segments = filtered.map((item) => {
    const slice = (item.value / total) * 100;
    const next = cursor + slice;
    const color = resolveColor(item.color);
    const segment = `${color} ${cursor}% ${next}%`;
    cursor = next;
    return segment;
  });

  return `conic-gradient(${segments.join(', ')})`;
};

export const CommunityImpact: React.FC<CommunityImpactProps> = ({
  title,
  subtitle,
  breakdown,
  localLabel = '100% Local'
}) => {
  const donutStyle = {
    background: buildConicGradient(breakdown)
  };

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-lg font-bold text-text">{title}</h4>
          <span className="inline-flex items-center rounded-full bg-primary text-white text-xs font-semibold px-3 py-1">
            {localLabel}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative h-36 w-36 shrink-0">
            <div className="h-full w-full rounded-full shadow-sm" style={donutStyle}></div>
            <div className="absolute inset-4 rounded-full bg-surface shadow-inner"></div>
          </div>

          <div className="space-y-3 w-full">
            {breakdown.map((item) => {
              const color = resolveColor(item.color);
              return (
                <div key={item.label} className="flex items-center gap-3 text-sm font-semibold text-text">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                  <span>{item.value}%</span>
                  <span className="text-text-muted font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {subtitle && <p className="text-xs text-text-muted leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
};
