import { ChevronDownProps } from './types';
import clsx from 'clsx';

export function ChevronDown({ size = 18, className }: ChevronDownProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{ width: size, height: size }}
      className={clsx(
        'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'text-on-surface-variant/60',
        className,
      )}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
