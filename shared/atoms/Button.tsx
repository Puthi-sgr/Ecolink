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
  const baseStyles = "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 rounded-eco";
  
  const variants = {
    primary: "bg-primary text-surface hover:bg-primary-600",
    secondary: "bg-surface-2 text-text hover:bg-border",
    outline: "border border-border text-text hover:bg-surface-2",
    ghost: "bg-transparent text-text-muted hover:bg-surface-2"
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
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