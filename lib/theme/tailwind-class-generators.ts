// Encountered an issue embedding a MDX renderers recursively.
// The embedded components lose scope on default tailwind classes and won't apply them unless we define
// them ourselves and pass to tailwind.config.js

const paddingVariants = ['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];
const marginVariants = ['m', 'mt', 'mb', 'ml', 'mr', 'mx', 'my'];

const spacing = [
  '0',
  'px',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
];
// Reference: Tailwind Color Palette
// https://tailscan.com/colors
const colors = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const colorPrefixes = ['text', 'bg', 'border'];

const generateSpacing = (prefixes, values) => prefixes.flatMap((p) => (values ?? []).map((v) => `${p}-${v}`));

const paddingSafelist = generateSpacing(paddingVariants, spacing);
const marginSafelist = generateSpacing(marginVariants, spacing);
const spacingSafelist = [...paddingSafelist, ...marginSafelist];

const generateColors = ({ prefixes, colors, shades }) => {
  const base = [];

  for (const prefix of prefixes) {
    for (const color of colors) {
      for (const shade of shades) {
        base.push(`${prefix}-${color}-${shade}`);
      }
    }
  }

  return base;
};

const generateDarkColors = ({ prefixes, colors, shades }) => {
  const base = [];

  for (const prefix of prefixes) {
    for (const color of colors) {
      for (const shade of shades) {
        base.push(`dark:${prefix}-${color}-${shade}`);
      }
    }
  }

  return base;
};

const colorSafelist = [
  ...generateColors({
    prefixes: colorPrefixes,
    colors,
    shades,
  }),
  ...generateDarkColors({
    prefixes: colorPrefixes,
    colors,
    shades,
  }),
];

const safeList = [...paddingSafelist, ...marginSafelist, ...spacingSafelist, ...colorSafelist];

export { safeList };
