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
      {/* Search Icon: Animates color on focus */}
      <div className="absolute left-3 text-(--primary)/40 group-focus-within:text-(--primary) transition-colors pointer-events-none">
        <HiOutlineSearch className="text-sm" />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          /* Layout & Typography */
          w-full pl-9 pr-3 py-1.5
          text-[11px] font-medium tracking-tight
          rounded-md transition-all
          
          /* Theming: Background & Text */
          bg-(--level-highest)
          text-(--on-surface) 
          placeholder:text-(--on-surface-variant)/50
          
          /* Theming: Border Logic */
          border border-outline-variant 
            
          /* Hover: High-contrast feedback */
          hover:border-slate-400 
          dark:hover:border-slate-600
          
          /* Focus: Brand color emphasis */
          focus:border-(--primary) 
          dark:focus:border-(--primary-container)
          focus:ring-0 focus:outline-none
          focus:bg-(--level-high)
        "
      />
    </div>
  );
}
