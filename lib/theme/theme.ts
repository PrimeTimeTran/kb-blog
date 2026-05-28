// 💡 Reference: Tailwind Color Palette
// https://tailscan.com/colors
const callOutTheme = {
  // BRANDED (Reactive to Seed)
  note: {
    border: 'border-primary',
    bg: 'bg-primary-container',
    text: 'text-on-primary-container',
  },
  info: {
    border: 'border-secondary',
    bg: 'bg-secondary-container', // We'll add this to the engine
    text: 'tex-on-secondary',
  },
  example: {
    border: 'border-tertiary',
    bg: 'bg-tertiary-container',
    text: 'text-on-tertiary-container',
  },

  // SEMANTIC (Harmonized to Seed)
  success: {
    border: 'border-success',
    bg: 'bg-success-container',
    text: 'text-on-success-container',
  },
  tip: {
    // Map Tip to Success
    border: 'border-success',
    bg: 'bg-success-container',
    text: 'text-on-success-container',
  },
  warning: {
    border: 'border-warning',
    bg: 'bg-warning-container',
    text: 'text-on-warning-container',
  },
  danger: {
    border: 'border-error',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
  },
  error: {
    border: 'border-error',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
  },
  failure: {
    border: 'border-error',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
  },

  // NEUTRAL (Surface Logic)
  quote: {
    border: 'border-outline',
    bg: 'bg-low',
    text: 'text-on-surface-variant',
  },
  abstract: {
    border: 'border-outline-variant',
    bg: 'bg-highest',
    text: 'text-on-surface',
  },

  // EXTRA SEMANTICS (Pink/Violet etc - map to Tertiary or add to engine)
  bug: {
    border: 'border-tertiary',
    bg: 'bg-tertiary-container',
    text: 'text-on-tertiary-container',
  },
  question: {
    border: 'border-primary',
    bg: 'bg-primary-container',
    text: 'text-on-primary-container',
  },
};

const HEADING_THEME = {
  1: {
    tag: 'h1',
    base: 'text-4xl md:text-5xl font-black tracking-tight mt-8 mb-4 leading-tight',
    color: 'text-primary',
  },
  2: {
    tag: 'h2',
    base: 'text-2xl md:text-3xl font-bold tracking-tight mt-8 mb-4 leading-snug',
    color: 'text-tertiary',
  },
  3: {
    tag: 'h3',
    base: 'text-xl md:text-2xl font-bold mt-6 mb-3 leading-snug',
    color: 'text-secondary',
  },
  4: {
    tag: 'h4',
    base: 'text-lg md:text-xl font-semibold mt-6 mb-2 leading-normal',
    color: 'text-success',
  },
  5: {
    tag: 'h5',
    base: 'text-base md:text-lg font-medium mt-4 mb-2 leading-normal',
    color: 'text-on-surface-variant',
  },
  6: {
    tag: 'h6',
    base: 'text-xs font-bold uppercase tracking-widest mt-4 mb-2 leading-none',
    color: 'text-on-surface/40',
  },
};

const FALLBACK_HEADING = HEADING_THEME[6];

/**
 * Returns the individual text color class for a specific header level.
 * Useful for contextual overrides like sidebars, TOC highlight states, or index maps.
 */
function getHeadingColor(level) {
  return (HEADING_THEME[level] ?? FALLBACK_HEADING).color;
}

/**
 * Combines typography structure and semantic coloring into a single class string.
 * Feeds cleanly into components rendering dynamic headers inside your MDX canvas.
 */
function getHeadingClass(level) {
  const config = HEADING_THEME[level] ?? FALLBACK_HEADING;
  return `${config.base} ${config.color}`;
}

/**
 * Optional Helper: If your rendering layer needs to dynamically know which HTML string tag
 * to render programmatically (e.g. <Tag className={getHeadingClass(level)} />)
 */
function getHeadingTag(level) {
  return (HEADING_THEME[level] ?? FALLBACK_HEADING).tag;
}
const headingColors = {
  0: 'text-primary',
  1: 'text-tertiary',
  2: 'text-secondary',
  3: 'text-success',
  4: 'text-on-surface-variant',
  5: 'text-on-surface/40',
};

const headingTheme = {
  h1: 'text-4xl md:text-5xl font-black tracking-tight text-primary mt-8 mb-4 leading-tight',
  h2: 'text-2xl md:text-3xl font-bold tracking-tight text-tertiary mt-8 mb-4 leading-snug',
  h3: 'text-xl md:text-2xl font-bold text-secondary mt-6 mb-3 leading-snug',
  h4: 'text-lg md:text-xl font-semibold text-success mt-6 mb-2 leading-normal',
  h5: 'text-base md:text-lg font-medium text-on-surface-variant mt-4 mb-2 leading-normal',
  h6: 'text-xs font-bold uppercase tracking-widest text-on-surface/40 mt-4 mb-2 leading-none',
};

const levelToHeadingKey = {
  0: 'h1',
  1: 'h2',
  2: 'h3',
  3: 'h4',
  4: 'h5',
  5: 'h6',
  6: 'h6',
};

const theme = {
  callOutTheme,
};

export { callOutTheme, headingTheme, headingColors, getHeadingClass, getHeadingColor, theme, HEADING_THEME };
