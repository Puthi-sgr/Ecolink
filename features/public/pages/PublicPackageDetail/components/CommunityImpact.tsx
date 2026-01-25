import React from 'react';

const IMPACT_BREAKDOWN = [
  { label: 'Local guides & rangers', value: '40%' },
  { label: 'Homestays & meals', value: '35%' },
  { label: 'Community fund', value: '15%' },
  { label: 'Conservation patrols', value: '10%' }
];

export const CommunityImpact: React.FC = () => {
  return (
    <section className="space-y-4">
      <h4 className="text-lg font-bold text-text">How the visit benefits the community</h4>
      <p className="text-sm text-text-muted leading-relaxed">
        Revenue is split across guides, homestays, and a community fund. A portion supports
        conservation patrols and training. Impact breakdown reports are shared to improve
        transparency and planning.
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {IMPACT_BREAKDOWN.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">{item.label}</p>
            <p className="text-lg font-bold text-text mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
