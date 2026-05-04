import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  className = '',
  id,
  ...props
}) => (
  <div className="flex flex-col gap-2">
    {label ? (
      <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted" htmlFor={id}>
        {label}
      </label>
    ) : null}
    <select
      id={id}
      className={`rounded-eco border border-border/30 bg-surface px-eco py-eco text-text shadow-[0_8px_24px_rgba(25,28,29,0.03)] transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/12 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
