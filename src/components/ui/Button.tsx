"use client";

import { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react';
import Link, { LinkProps } from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<ComponentPropsWithoutRef<'button'>, 'disabled' | 'onClick' | 'type'>;

type ButtonAsLink = ButtonBaseProps & {
  as?: 'a';
  href: string;
  type?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & Omit<LinkProps, 'href' | 'onClick'>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((
  {
    as: Component = 'button',
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    fullWidth = false,
    type = 'button',
    ariaLabel,
    href,
    ...props
  },
  ref
) => {
  // Base classes with CSS transitions for animations
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform-gpu';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-teal-400 hover:from-blue-700 hover:to-teal-500 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
  };

  // Combine classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  if (Component === 'a') {
    const linkProps = {
      ...props as Omit<LinkProps, 'href' | 'onClick'>,
      className: buttonClasses,
      'aria-label': ariaLabel,
      onClick: onClick as React.MouseEventHandler<HTMLAnchorElement>,
      ref: ref as React.Ref<HTMLAnchorElement>
    };
    
    return (
      <Link href={href || '#'} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = {
    ...props as React.ButtonHTMLAttributes<HTMLButtonElement>,
    type,
    className: buttonClasses,
    disabled,
    'aria-label': ariaLabel,
    onClick: onClick as React.MouseEventHandler<HTMLButtonElement>,
    ref: ref as React.Ref<HTMLButtonElement>
  };

  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;