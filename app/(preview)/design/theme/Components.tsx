import React from 'react';
import { HiCollection, HiColorSwatch, HiPlus } from 'react-icons/hi';
import { THEME_VAULT } from '@/lib/theme/palette';

interface ColorBoxProps {
  label: string;
  bg: string;
  text: string;
  sub: string;
}

export function ColorBox({ label, bg, text, sub }: ColorBoxProps) {
  return (
    <div
      className={`${bg} ${text} p-6 rounded-[2rem] shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group`}
    >
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{label}</p>
        <HiColorSwatch className="opacity-20 group-hover:opacity-60 transition-opacity" />
      </div>
      <p className="text-2xl font-black mt-2 mb-1 uppercase tracking-tighter">
        {/* We grab the computed hex value from the element if possible, or just show the label */}
        Dynamic
      </p>
      <p className="text-[9px] font-bold opacity-60 uppercase tracking-tight">{sub}</p>
    </div>
  );
}

interface FloatingPickerProps {
  seed: string;
  setSeed: (color: string) => void;
}

export function FloatingPicker({ seed, setSeed }: FloatingPickerProps) {
  // Find the active theme name for the tooltip
  const activeTheme = THEME_VAULT.find((t) => t.seed === seed);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center gap-4 w-max">
      {/* Active Theme Badge */}
      <div className="bg-primary text-on-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-fadeIn flex items-center gap-2">
        <HiCollection className="opacity-50" />
        {activeTheme ? activeTheme.name : 'Custom Palette'}
      </div>

      <div className="bg-highest/60 backdrop-blur-2xl border border-outline/20 p-2 rounded-full shadow-2xl flex items-center gap-2">
        <div className="flex items-center gap-2 px-2">
          {THEME_VAULT.map((theme) => (
            <button
              key={theme.seed}
              onClick={() => setSeed(theme.seed)}
              className={`group relative w-10 h-10 rounded-full transition-all duration-500 ease-out ${
                seed === theme.seed
                  ? 'ring-2 ring-primary ring-offset-4 scale-110 shadow-lg'
                  : 'hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: theme.seed }}
            >
              {/* Tooltip with Name and Description */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
                <div className="bg-on-surface text-surface p-2 rounded-xl shadow-xl w-48 text-center border border-outline/10">
                  <p className="text-[10px] font-black uppercase tracking-tighter">{theme.name}</p>
                  <p className="text-[8px] font-medium leading-tight mt-1 opacity-80">{theme.description}</p>
                </div>
                <div className="w-2 h-2 bg-on-surface rotate-45 -mt-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="w-px h-8 bg-outline/20 mx-1" />

        {/* Custom Hex Input */}
        <div className="relative group px-2">
          <input
            type="color"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none shadow-inner"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white mix-blend-difference opacity-40 group-hover:opacity-100 transition-opacity">
            <HiPlus size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Section: Data & Feedback Elements
export const DataPreview = () => (
  <section className="space-y-4">
    <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">Data & Feedback</h3>
    <div className="bg-low border border-outline/10 rounded-3xl p-6 space-y-6">
      {/* Progress Bars */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold">
          <span>Storage Usage</span>
          <span className="text-primary">85%</span>
        </div>
        <div className="h-2 w-full bg-highest rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: '85%' }} />
        </div>
      </div>

      {/* Chips / Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold border border-secondary/20">
          Secondary Chip
        </span>
        <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-bold border border-tertiary/20">
          Tertiary Tag
        </span>
        <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-[10px] font-bold">Primary Badge</span>
      </div>
    </div>
  </section>
);

// Section: Navigation & Selection
export const SelectionPreview = () => (
  <section className="space-y-4">
    <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">Selection</h3>
    <div className="bg-low border border-outline/10 rounded-3xl p-4">
      <nav className="flex flex-col gap-1">
        {['Dashboard', 'Analytics', 'Settings'].map((item, i) => (
          <div
            key={item}
            className={`px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
              i === 0 ? 'bg-primary/10 text-primary' : 'hover:bg-highest text-on-surface-variant'
            }`}
          >
            <span className="text-sm font-bold">{item}</span>
            {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
          </div>
        ))}
      </nav>
    </div>
  </section>
);

export const FormsAndTables = () => (
  <section className="lg:col-span-12 space-y-8 mt-12">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* INPUT STATES COLUMN */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">Input States</h3>
        <div className="bg-low border border-outline/10 rounded-[2rem] p-8 space-y-6">
          <div className="bg-low border border-outline/10 rounded-[2rem] p-8 space-y-6">
            {/* Standard states */}
            <InputGroup label="Default State" placeholder="Standard input..." />

            {/* The new Hovered preview */}
            <InputGroup label="Hovered State" placeholder="Soft primary border..." isHovered />

            <InputGroup label="Focused State" placeholder="Primary glow..." isFocused />

            <InputGroup label="Error State" placeholder="Invalid data..." error="This field is required" />

            <InputGroup label="Disabled State" placeholder="You cannot edit this" isDisabled />
          </div>
        </div>
      </div>

      {/* DATA TABLE COLUMN */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">System Logs</h3>
        <div className="bg-low border border-outline/10 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-highest/50 border-b border-outline/10">
                <th className="px-6 py-4 text-[10px] font-black uppercase opacity-60">Service</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase opacity-60">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase opacity-60">Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              <TableRow name="Auth Engine" status="Online" tone="success" load={12} />
              <TableRow name="Asset CDN" status="Syncing" tone="warning" load={64} />
              <TableRow name="API Gateway" status="Critical" tone="error" load={99} />
              <TableRow name="Edge Cache" status="Offline" tone="default" load={0} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

// --- INPUT GROUP ---
interface InputProps {
  label: string;
  placeholder: string;
  error?: string;
  isFocused?: boolean;
  isDisabled?: boolean;
  isHovered?: boolean; // New prop for the showcase
}

export const InputGroup = ({ label, placeholder, error, isFocused, isDisabled, isHovered }: InputProps) => (
  <div className="space-y-1.5 group">
    <label
      className={`text-[10px] font-black uppercase tracking-tight transition-colors ${
        error ? 'text-error' : isFocused || isHovered ? 'text-primary' : 'opacity-50'
      }`}
    >
      {label}
    </label>
    <input
      disabled={isDisabled}
      autoFocus={isFocused}
      placeholder={placeholder}
      className={`
    w-full px-4 py-3 rounded-xl text-sm font-medium transition-all outline-none border
    bg-highest/50

    /* 1. SHARED HOVER LOGIC (Real :hover AND Preview Prop) */
    ${
      !isDisabled && !isFocused && !error
        ? `
      hover:border-primary/50 hover:bg-highest hover:ring-4 hover:ring-primary/5
      ${isHovered ? 'border-primary/50 bg-highest ring-4 ring-primary/5' : 'border-outline/20'}
    `
        : ''
    }

    /* 2. ERROR STATE */
    ${error ? 'border-error ring-4 ring-error/10 text-error placeholder:text-error/40' : ''}

    /* 3. FOCUSED STATE (Highest Priority) */
    ${isFocused ? 'border-primary ring-4 ring-primary/20 bg-low' : ''}

    /* 4. DISABLED STATE */
    ${isDisabled ? 'opacity-40 cursor-not-allowed grayscale bg-highest border-outline/10' : ''}
  `}
    />
    {error && <p className="text-[9px] font-bold text-error mt-1 uppercase tracking-tighter animate-fadeIn">{error}</p>}
  </div>
);

// --- TABLE ROW ---
interface TableRowProps {
  name: string;
  status: string;
  tone: 'success' | 'warning' | 'error' | 'default';
  load: number;
}

const TableRow = ({ name, status, tone, load }: TableRowProps) => {
  const toneColors = {
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    error: 'text-error bg-error/10',
    default: 'text-on-surface-variant bg-highest',
  };

  return (
    <tr className="hover:bg-highest/30 transition-colors group">
      <td className="px-6 py-4">
        <div className="text-sm font-black tracking-tight">{name}</div>
        <div className="text-[9px] font-bold opacity-40 uppercase">v2.4.0</div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${toneColors[tone]}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="w-24 h-1.5 bg-highest rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              tone === 'error' ? 'bg-error' : tone === 'warning' ? 'bg-warning' : 'bg-primary'
            }`}
            style={{ width: `${load}%` }}
          />
        </div>
      </td>
    </tr>
  );
};

export const SurfaceDeepDive = () => (
  <section className="lg:col-span-12 space-y-6 mt-12">
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-black tracking-tight text-on-surface">The Surface Stack</h3>
      <p className="text-sm text-on-surface-variant max-w-2xl">
        In Material 3, we don't just use one grey. We use a stack of "Containers" that get lighter as they float higher.
      </p>
    </div>

    {/* The Stack Visualization */}
    <div className="bg-background border border-outline/10 p-12 rounded-[3rem] relative overflow-hidden">
      <span className="absolute top-4 left-6 text-[10px] font-black text-on-surface/20 uppercase">
        Level 0: Background
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {/* Level 1: Standard Surface */}
        <div className="bg-low p-8 rounded-[2rem] border border-outline/5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider">
              Low Elevation
            </span>
          </div>
          <h4 className="text-on-surface font-black">Surface Low</h4>
          <p className="text-on-surface-variant text-xs leading-relaxed font-medium">
            Use this for your main content areas. It has a slight tint of your primary seed.
          </p>
          <div className="pt-4 border-t border-outline/10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-80">
            var(--low)
          </div>
        </div>

        {/* Level 2: Higher Surface */}
        <div className="bg-highest p-8 rounded-[2rem] border border-outline/10 shadow-md space-y-4 transform md:-translate-y-4">
          <div className="flex justify-between items-start">
            <span className="bg-tertiary/10 text-tertiary px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider">
              High Elevation
            </span>
          </div>
          <h4 className="text-on-surface font-black">Surface Highest</h4>
          <p className="text-on-surface-variant text-xs leading-relaxed font-medium">
            Use this for "floating" elements like Popups, Modals, or Active Navigation items.
          </p>
          <div className="pt-4 border-t border-outline/10 text-[10px] font-bold text-shadow-on-surface-variant uppercase tracking-tighter">
            var(--level-highest)
          </div>
        </div>

        {/* Level 3: The Primary Container (Fully Branded) */}
        <div className="bg-primary-container p-8 rounded-[2rem] border border-primary/20 shadow-lg space-y-4 transform md:-translate-y-8">
          <div className="flex justify-between items-start">
            <span className="bg-on-primary-container/10 text-on-primary-container px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider">
              Branded Level
            </span>
          </div>
          <h4 className="text-on-primary-container font-black">Primary Container</h4>
          <p className="text-on-primary-container/80 text-xs leading-relaxed font-medium">
            This is a surface that is "energized" by your brand color. Use it for highlights.
          </p>
          <div className="pt-4 border-t border-on-primary-container/10 text-[10px] font-bold text-on-primary-container/40 uppercase tracking-tighter">
            var(--primary-container)
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ColorTokenGuide = () => (
  <section className="lg:col-span-12 space-y-8 mt-16">
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-black tracking-tight">The Material Role Map</h3>
      <p className="text-sm opacity-60">Understanding when to use Primary vs. Secondary vs. Surface.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* PRIMARY ROLE */}
      <TokenCard
        title="Primary"
        bg="bg-primary"
        text="text-on-primary"
        desc="High-emphasis actions (Main buttons, FABs)."
      />
      <TokenCard
        title="Primary Container"
        bg="bg-primary-container"
        text="text-on-primary-container"
        desc="Medium-emphasis blocks (Active states, search bars)."
      />

      {/* SECONDARY ROLE */}
      <TokenCard
        title="Secondary"
        bg="bg-secondary"
        text="text-white"
        desc="Less prominent components (Filter chips, sub-actions)."
      />
      <TokenCard
        title="Tertiary"
        bg="bg-tertiary"
        text="text-white"
        desc="Contrasting accents (Notification badges, inputs)."
      />

      {/* SURFACE & VARIANTS */}
      <TokenCard
        title="Surface Variant"
        bg="bg-highest"
        text="text-on-surface-variant"
        desc="Subtle boundaries (Dividers, card outlines)."
      />
      <TokenCard
        title="Inverse Surface"
        bg="bg-on-surface"
        text="text-surface"
        desc="High-contrast popups (Snackbars, Tooltips)."
      />

      {/* DANGER/UTILITY */}
      <TokenCard
        title="Error"
        bg="bg-error"
        text="text-white"
        desc="Critical warnings (Delete buttons, invalid inputs)."
      />
      <TokenCard
        title="Outline"
        bg="bg-transparent"
        text="text-on-surface"
        className="border-2 border-outline"
        desc="Neutral boundaries (Text fields, ghost buttons)."
      />
    </div>
  </section>
);

const TokenCard = ({ title, bg, text, desc, className = '' }: any) => (
  <div
    className={`${bg} ${text} ${className} p-5 rounded-[2rem] flex flex-col justify-between min-h-[160px] shadow-sm`}
  >
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{title}</p>
      <p className="text-xs font-bold leading-tight">{desc}</p>
    </div>
    <p className="text-[9px] font-mono opacity-50 uppercase tracking-tighter">css-variable-token</p>
  </div>
);
