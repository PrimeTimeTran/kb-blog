// 💡 Reference: Tailwind Color Palette
// https://tailscan.com/colors
export const callOutTheme = {
  // BRANDED (Reactive to Seed)
  note: {
    border: 'border-primary',
    bg: 'bg-primary-container',
    text: 'text-on-primary-container',
  },
  info: {
    border: 'border-secondary',
    bg: 'bg-secondary-container', // We'll add this to the engine
    text: 'text-on-secondary-container',
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
    bg: 'bg-surface-container-low',
    text: 'text-on-surface-variant',
  },
  abstract: {
    border: 'border-outline-variant',
    bg: 'bg-surface-container-highest',
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
}

export const dynamicHeaders = {
  // H1: Highest Emphasis (Brand Color)
  h1: 'text-primary font-black tracking-tight',

  // H2: Secondary Emphasis (Tertiary Color - usually a hue shift)
  h2: 'text-tertiary font-bold tracking-tight',

  // H3: Tertiary Emphasis (Secondary Color - usually more muted)
  h3: 'text-secondary font-bold',

  // H4: Successful/Positive Semantic (Success Color)
  h4: 'text-success font-semibold',

  // H5: Sub-headers (The Variant Ink)
  h5: 'text-on-surface-variant font-medium',

  // H6: Meta/Overline (The Muted Ink)
  h6: 'text-on-surface/40 font-bold uppercase tracking-widest',
}

export const headingTheme = dynamicHeaders

const levelToHeadingKey = {
  0: 'h1',
  1: 'h2',
  2: 'h3',
  3: 'h4',
  4: 'h5',
  5: 'h6',
  6: 'h6',
}

export function getHeadingClass(level) {
  const key = levelToHeadingKey[level] ?? 'h6'
  return headingTheme[key]
}

export const theme = {
  callOutTheme,
}
