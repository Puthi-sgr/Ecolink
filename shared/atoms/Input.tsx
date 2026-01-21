import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', id, ...props }) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-text-muted">{label}</label>}
      <input 
        id={inputId}
        className={`w-full border border-border bg-surface rounded-eco px-eco py-eco focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text ${className}`}
        {...props}
      />
    </div>
  );
};