import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'surface';
  size?: 'xs' | 'sm';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'surface', 
  size = 'xs',
  className = '',
  icon
}) => {
  const variants = {
    primary: "border-primary/15 bg-primary/10 text-primary",
    secondary: "border-secondary-200 bg-secondary-50 text-secondary-700",
    accent: "border-accent-200 bg-accent-50 text-clay",
    outline: "border-border/25 bg-transparent text-text-muted",
    surface: "border-border/20 bg-surface text-text-muted shadow-[0_8px_22px_rgba(25,28,29,0.04)]"
  };

  const sizes = {
    xs: "px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
    sm: "px-3 py-1 text-xs font-medium"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
