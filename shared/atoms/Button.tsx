import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-eco text-center leading-none font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50";
  
  const variants = {
    primary: "bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-500))] text-white shadow-[0_14px_32px_rgba(68,152,26,0.18)] hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(68,152,26,0.22)]",
    secondary: "border border-border/30 bg-surface text-primary shadow-[0_10px_24px_rgba(25,28,29,0.04)] hover:border-primary/30 hover:bg-surface-2",
    outline: "border border-border/30 bg-transparent text-primary hover:border-primary/35 hover:bg-surface-2/80",
    ghost: "bg-transparent text-text-muted hover:bg-surface-2"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-eco py-eco text-base",
    lg: "px-6 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
