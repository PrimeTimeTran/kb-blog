import { HiOutlineSearch } from 'react-icons/hi';

interface StyledInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function StyledInput({ value, onChange, placeholder = 'Search...', className = '' }: StyledInputProps) {
  return (
    <div className={`relative group flex items-center ${className}`}>
      <div className="absolute left-3 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none">
        <HiOutlineSearch className="text-sm" />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
      w-full pl-9 pr-3 py-2

      text-sm font-medium tracking-tight

      rounded-lg

      bg-surface
      text-on-surface
      placeholder:text-on-surface-variant/60

      border border-outline-variant

      hover:border-outline hover:bg-level

      focus:border-primary
      focus:ring-4 focus:ring-primary/15
      focus:outline-none

      transition-all
    "
      />
    </div>
  );
}
