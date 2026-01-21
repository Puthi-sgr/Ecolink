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
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-surface-2 text-text-muted border-border",
    accent: "bg-accent/10 text-accent border-accent/20",
    outline: "border-border text-text-muted bg-transparent",
    surface: "bg-surface border-border text-text-muted shadow-sm"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
    sm: "px-2.5 py-1 text-xs font-medium"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
