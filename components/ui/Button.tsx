import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'dark' | 'lime';
  arrowIcon?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'dark',
  arrowIcon = '↗',
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = variant === 'lime' ? 'button button-lime' : 'button';
  return (
    <button className={`${variantClass} ${className}`} {...props}>
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">{arrowIcon}</span>
    </button>
  );
}
