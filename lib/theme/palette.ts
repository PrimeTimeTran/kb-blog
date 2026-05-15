// You'll need a tiny helper to convert Hex to HSL
// Or use a library like 'tinycolor2' or 'chroma-js'
import chroma from 'chroma-js'

const makeTokens = (seed, color, isDark, n, nv, sat, hue, getSemantic) => {
  return {
    // PRIMARY (The Brand)
    '--primary': seed,
    '--on-primary': color.luminance() > 0.5 ? '#000000' : '#ffffff',
    '--primary-container': isDark
      ? color.darken(2.5).desaturate(0.5).hex()
      : color.brighten(2.5).desaturate(0.2).hex(),
    '--on-primary-container': isDark ? color.brighten(3).hex() : color.darken(2).hex(),

    // SECONDARY & TERTIARY (Hue shifts)
    '--secondary': chroma.hsl((hue + 30) % 360, sat * 0.5, isDark ? 0.7 : 0.4).hex(),
    '--secondary-container': isDark
      ? chroma.hsl((hue + 30) % 360, sat * 0.3, 0.15).hex()
      : chroma.hsl((hue + 30) % 360, sat * 0.2, 0.95).hex(),
    '--on-secondary-container': isDark ? '#e1e2f6' : '#001d35',

    // TERTIARY (120 degree shift - Great for "Bugs" or "Tips")
    '--tertiary': chroma.hsl((hue + 120) % 360, sat * 0.5, isDark ? 0.7 : 0.5).hex(),
    '--tertiary-container': isDark
      ? chroma.hsl((hue + 120) % 360, sat * 0.3, 0.15).hex()
      : chroma.hsl((hue + 120) % 360, sat * 0.2, 0.95).hex(),
    '--on-tertiary-container': isDark ? '#ffdee7' : '#31101b',
    // SUCCESS (Emerald Blend)
    '--success': getSemantic(140, 0.5, isDark ? 0.7 : 0.4).hex(),
    '--success-container': getSemantic(140, 0.4, isDark ? 0.15 : 0.9).hex(),
    '--on-success-container': isDark ? '#b7f397' : '#00210a',

    // WARNING (Amber Blend)
    '--warning': getSemantic(45, 0.7, isDark ? 0.7 : 0.5).hex(),
    '--warning-container': getSemantic(45, 0.6, isDark ? 0.2 : 0.9).hex(),
    '--on-warning-container': isDark ? '#ffdf9e' : '#261900',

    // ERROR (Rose/Red Blend)
    '--error': getSemantic(0, 0.6, isDark ? 0.6 : 0.4).hex(),
    '--error-container': getSemantic(0, 0.5, isDark ? 0.15 : 0.9).hex(),
    '--on-error-container': isDark ? '#ffdad6' : '#410002',

    // THE SURFACE STACK (Neutral Tones)
    '--background': isDark ? n.darken(1).hex() : n.hex(),
    '--surface': isDark ? n.hex() : n.brighten(0.2).hex(),
    '--surface-container-low': isDark ? n.brighten(0.3).hex() : '#ffffff',
    '--surface-container': isDark ? n.brighten(0.6).hex() : n.darken(0.1).hex(),
    '--surface-container-high': isDark ? n.brighten(0.9).hex() : n.darken(0.2).hex(),
    '--surface-container-highest': isDark ? n.brighten(1.2).hex() : n.darken(0.4).hex(),

    // INK & OUTLINES (Neutral Variant Tones)
    '--on-surface': isDark ? n.brighten(5).hex() : n.darken(5).hex(),
    '--on-surface-variant': isDark ? nv.brighten(3).hex() : nv.darken(3).hex(),
    '--outline': isDark ? nv.brighten(1).hex() : nv.darken(1).hex(),
    '--outline-variant': isDark ? nv.hex() : nv.darken(0.5).hex(),

    // INVERSE (For Snackbars/Tooltips)
    '--inverse-surface': isDark ? n.brighten(6).hex() : n.darken(4).hex(),
    '--inverse-on-surface': isDark ? n.darken(4).hex() : n.brighten(6).hex(),
    // SECONDARY (30 degree shift)
  }
}

export const applyMaterialTheme = async (seed: string, isDark: boolean) => {
  const color = chroma(seed)
  const hue = color.get('hsl.h')
  const sat = color.get('hsl.s')
  const root = document.documentElement

  // 1. BRAND HARMONY HELPER
  // This ensures semantic colors (Red/Green) feel like they belong to the brand.
  const getSemantic = (baseHue: number, s: number, l: number) => {
    const blendedHue = baseHue * 0.85 + hue * 0.15 // 15% brand injection
    return chroma.hsl(blendedHue, s, l)
  }

  // 2. NEUTRAL GENERATOR (For Surfaces)
  // M3 uses Neutral (N) and Neutral Variant (NV) for backgrounds and text.
  const n = chroma.hsl(hue, sat * 0.1, isDark ? 0.1 : 0.98) // Very desaturated seed
  const nv = chroma.hsl(hue, sat * 0.2, isDark ? 0.2 : 0.9) // Slightly more saturated
  const palette = makeTokens(seed, color, isDark, n, nv, sat, hue, getSemantic)

  Object.entries(palette).forEach(([prop, val]) => {
    root.style.setProperty(prop, val)
  })
  // await updateFavicon(seed, isDark)
  await updateDynamicFavicon(seed, isDark)
}

export function generateThemeTokens(seedColor) {
  const color = chroma(seedColor)
  const hue = color.get('hsl.h')
  const sat = color.get('hsl.s')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return {
    // Primary remains the seed
    '--primary': color.hex(),
    '--on-primary': color.luminance() > 0.5 ? '#000000' : '#ffffff',
    '--primary-container': color.brighten(2.5).desaturate(0.5).hex(),

    // Secondary: Shift Hue by 30 degrees and desaturate
    '--secondary': chroma.hsl((hue + 30) % 360, sat * 0.5, 0.4).hex(),
    '--on-secondary': '#ffffff',

    // Tertiary: Shift Hue by 120 degrees (Analogous/Split-Comp)
    '--tertiary': chroma.hsl((hue + 120) % 360, sat * 0.7, 0.5).hex(),

    // Error: Standard Material Red
    '--error': '#ba1a1a',

    // Surfaces: Neutralized version of the seed color
    '--surface': chroma.hsl(hue, sat * 0.1, 0.98).hex(),
    '--on-surface': '#1c1b1f',
    '--outline': chroma.hsl(hue, sat * 0.2, 0.5).hex(),
  }
}

export const applyTheme = (seed) => {
  const palette = generateThemeTokens(seed)
  const root = document.documentElement

  Object.entries(palette).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}

export const THEME_VAULT = [
  {
    name: 'Vampire Mode',
    seed: '#bd93f9', // The Dracula Purple
    description: 'Deep purples and neon accents inspired by the iconic dark theme.',
  },
  {
    name: 'Classic Flutter',
    seed: '#2196F3',
    description: 'The iconic Material blue. Great for clean, professional dashboards.',
  },
  {
    name: 'Deep Forest',
    seed: '#1b4332',
    description: "Sophisticated green. Excellent for dark mode 'zen' environments.",
  },
  {
    name: 'Cyberpunk Rose',
    seed: '#ff0055',
    description: 'High-energy pink. The HSL shift creates a killer purple tertiary color.',
  },
  {
    name: 'Nordic Slate',
    seed: '#4c566a',
    description: 'Desaturated blue-grey. Very easy on the eyes for long coding sessions.',
  },
  {
    name: 'Golden Hour',
    seed: '#ffb703',
    description: 'Warm and inviting. The secondary surfaces become beautifully cream-toned.',
  },
  {
    name: 'Royal Amethyst',
    seed: '#6200ee',
    description: 'The original Material Design primary color.',
  },
  {
    name: 'Deep Sea',
    seed: '#00658b',
    desc: 'Blue primary. Tertiary becomes a beautiful sea-foam green.',
  },
  {
    name: 'Pumpkin Spice',
    seed: '#bb5100',
    desc: 'Autumn vibes. The surfaces become warm peachy-greys.',
  },
  {
    name: 'Lavender Fog',
    seed: '#6750a4',
    desc: 'Soft purple. High-end look for SaaS or creative tools.',
  },
]

const updateDynamicFavicon = (seed: string, isDark: boolean) => {
  try {
    const color = chroma(seed)
    // Contrast color for the text (the "LT")
    const textColor = color.luminance() > 0.5 ? '#000000' : '#FFFFFF'

    // 1. Define the SVG Structure
    // - rect: The rounded square background (using the seed color)
    // - text: "LT" centered horizontally and vertically
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="${seed}" />
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dy=".35em" 
          fill="${textColor}" 
          font-family="sans-serif" 
          font-weight="900" 
          font-size="18"
        >
          LT
        </text>
      </svg>
    `.trim()

    // 2. Encode to Base64
    const encodedSvg = window.btoa(unescape(encodeURIComponent(svgString)))
    const dataUrl = `data:image/svg+xml;base64,${encodedSvg}`

    // 3. Update the link tag
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = dataUrl
  } catch (error) {
    console.error('Favicon error:', error)
  }
}
