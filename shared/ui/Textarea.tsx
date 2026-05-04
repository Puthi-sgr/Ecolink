import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
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
    <textarea
      id={id}
      className={`min-h-[96px] w-full rounded-eco border border-border/30 bg-surface px-eco py-eco text-text shadow-[0_8px_24px_rgba(25,28,29,0.03)] transition-all placeholder:text-text-muted/55 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/12 ${className}`}
      {...props}
    />
  </div>
);
