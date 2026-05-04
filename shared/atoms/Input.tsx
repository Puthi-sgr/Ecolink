import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', id, ...props }) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
          {label}
        </label>
      )}
      <input 
        id={inputId}
        className={`w-full rounded-eco border border-border/30 bg-surface px-eco py-eco text-text shadow-[0_8px_24px_rgba(25,28,29,0.03)] transition-all placeholder:text-text-muted/55 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/12 ${className}`}
        {...props}
      />
    </div>
  );
};
