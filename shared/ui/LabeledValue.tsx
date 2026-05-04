import React from 'react';

interface LabeledValueProps {
  label: React.ReactNode;
  value: React.ReactNode;
  align?: 'left' | 'right';
}

export const LabeledValue: React.FC<LabeledValueProps> = ({
  label,
  value,
  align = 'left',
}) => (
  <div className={align === 'right' ? 'text-right' : ''}>
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">{label}</p>
    <div className="mt-1 text-sm font-semibold text-text">{value}</div>
  </div>
);

