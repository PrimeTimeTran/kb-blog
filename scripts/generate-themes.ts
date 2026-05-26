import fs from 'fs';

const base = `
  body {
    @apply bg-surface text-on-surface;
  }

  .card {
    @apply bg-surface-container rounded-xl p-4;
  }
`;

// 1. Define your Surface Palette here
const surfacePalette = {
  lowest: { light: '#f4f4f5', dark: '#18181b' },
  low: { light: '#e4e4e7', dark: '#27272a' },
  level: { light: '#d4d4d8', dark: '#3f3f46' }, // The "Mid" layer
  high: { light: '#c4c4c8', dark: '#52525b' },
  highest: { light: '#b4b4b8', dark: '#71717a' },
  surface: { light: '#ffffff', dark: '#1e293b' },
  onSurface: { light: '#1c1b1f', dark: '#f8fafc' },
  surfaceVariant: { light: '#ece6f0', dark: '#334155' },
  onSurfaceVariant: { light: '#49454f', dark: '#cbd5e1' },
};

const intentPalette = {
  primary: { light: '#6750a4', dark: '#d0bcff' },
  'on-primary': { light: '#ffffff', dark: '#21005d' },
  'primary-container': { light: '#eaddff', dark: '#4f378b' },
  'on-primary-container': { light: '#21005d', dark: '#eaddff' },

  secondary: { light: '#625b71', dark: '#ccc2dc' },
  'on-secondary': { light: '#ffffff', dark: '#332d41' },
  'secondary-container': { light: '#e8def8', dark: '#4a4458' },
  'on-secondary-container': { light: '#1d192b', dark: '#e8def8' },

  tertiary: { light: '#7d5260', dark: '#efb8c8' },
  'on-tertiary': { light: '#ffffff', dark: '#492532' },
  'tertiary-container': { light: '#ffd8e4', dark: '#633b48' },
  'on-tertiary-container': { light: '#31111d', dark: '#ffd8e4' },

  error: { light: '#b3261e', dark: '#601410' },
  'on-error': { light: '#ffffff', dark: '#E7D0CF' },
  'error-container': { light: '#f9dedc', dark: '#8c1d18' },
  'on-error-container': { light: '#410e0b', dark: '#f9dedc' },

  success: { light: '#386a20', dark: '#b7f397' },
  'on-success': { light: '#ffffff', dark: '#0f2e00' },
  'success-container': { light: '#d7f5c5', dark: '#275b1a' },
  'on-success-container': { light: '#0f2e00', dark: '#d7f5c5' },

  warning: { light: '#725c0c', dark: '#f1e1a6' },
  'on-warning': { light: '#ffffff', dark: '#261a00' },
  'warning-container': { light: '#ffe9a3', dark: '#5a4300' },
  'on-warning-container': { light: '#261a00', dark: '#ffe9a3' },

  info: { light: '#00639b', dark: '#a8c7ff' },
  'on-info': { light: '#ffffff', dark: '#001d36' },
  'info-container': { light: '#d1e4ff', dark: '#004a77' },
  'on-info-container': { light: '#001d36', dark: '#d1e4ff' },

  outline: { light: '#79747e', dark: '#938f99' },
  'outline-variant': { light: '#cac4d0', dark: '#49454f' },
};

const outlineKeys = ['outline', 'outline-variant'];

const states = ['hover', 'active', 'inactive'];

function generateCSS() {
  let themeBlock = `@theme {\n`;
  let rootBlock = `:root {\n`;
  let darkBlock = `.dark {\n`;

  // 1. Process Surfaces
  for (const [key, val] of Object.entries(surfacePalette)) {
    const cssName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    themeBlock += `  ${cssName}: ${val.light};\n`;
    themeBlock += `  ${cssName}-dark: ${val.dark};\n`;
    rootBlock += `  ${cssName}: ${val.light};\n`;
    darkBlock += `  ${cssName}: var(${cssName}-dark);\n`;
  }

  // 2. Process Intents (The unified approach)
  Object.entries(intentPalette).forEach(([key, val]) => {
    // A. Define the base color
    rootBlock += `  --${key}: ${val.light};\n`;
    darkBlock += `  --${key}: ${val.dark};\n`;
    themeBlock += `  --color-${key}: var(--${key});\n`;

    // B. AUTO-GENERATE STATES: If this is a base intent (no '-' in the key),
    // we can automatically create states for it.
    if (!key.includes('-')) {
      states.forEach((state) => {
        const stateKey = `${key}-${state}`;
        // We link the state variable to a specific CSS var
        rootBlock += `  --${stateKey}: var(--${key});\n`;
        themeBlock += `  --color-${stateKey}: var(--${stateKey});\n`;
      });
    }
  });

  // 3. Process Outlines (Static)
  outlineKeys.forEach((key) => {
    const varName = `--color-${key}`;
    themeBlock += `  ${varName}: var(--${key});\n`;
    rootBlock += `  ${varName}: var(--${key});\n`;
  });

  const output = `@variant dark (&:where(.dark, .dark *)); \n\n${themeBlock}}\n\n@layer base {\n${rootBlock}}\n\n${darkBlock}}\n\n${base}\n}`;

  fs.writeFileSync('new.base.css', output);
  console.log('Successfully generated new.base.css using the unified intentPalette!');
}

generateCSS();
