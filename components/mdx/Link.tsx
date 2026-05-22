import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type SafeLinkProps = Partial<LinkProps> &
  ComponentPropsWithoutRef<'a'> & {
    children: ReactNode;
  };

export function SafeLink({ href, children, className, ...props }: SafeLinkProps) {
  const baseLinkStyles = twMerge(
    'text-primary hover:text-primary-hover font-medium transition-colors duration-200',
    'underline decoration-primary/30 hover:decoration-primary underline-offset-4',
    'rounded px-1 -mx-1 hover:bg-primary/5', // Subtle, clean background hover pill
    className,
  );

  const fallbackStyles = twMerge('text-on-surface/70 cursor-default font-medium', className);

  // Fallback rendering when no valid string address is passed
  if (!href || typeof href !== 'string') {
    return (
      <span className={fallbackStyles} {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link className={baseLinkStyles} href={href} {...props}>
      {children}
    </Link>
  );
}
