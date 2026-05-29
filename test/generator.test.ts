import { describe, expect, it } from 'vitest';
import { generateCSS, intentPalette, resolvedIntentPalette, surfacePalette } from '../scripts/generate-themes';

const elevations = ['background', 'lowest', 'low', 'level', 'high', 'highest', 'surface'];

describe('generateCSS', () => {
  const css = generateCSS();
  it('includes core CSS sections', () => {
    expect(css).toContain('@custom-variant dark');
    expect(css).toContain('@theme');
    expect(css).toContain('@layer base');
    expect(css).toContain(':root');
    expect(css).toContain('.dark');
  });
  describe('surface elevation system', () => {
    it('generates surface palette variables in root', () => {
      expect(css).toContain('--low:');
      expect(css).toContain('--level:');
      expect(css).toContain('--highest:');
    });

    it('generates matching dark surface variables', () => {
      expect(css).toContain('.dark');
      expect(css).toContain('--low:');
    });

    it('generates tailwind theme mapping for surfaces', () => {
      expect(css).toContain('--color-low: var(--low)');
      expect(css).toContain('--color-level: var(--level)');
    });
    it('does not have duplicate light values across elevations', () => {
      const seen = new Set<string>();

      for (const key of elevations) {
        const value = surfacePalette[key as keyof typeof surfacePalette]?.light;

        expect(value, `Missing light value for ${key}`).toBeDefined();

        expect(seen.has(value), `Duplicate light value detected: ${value}`).toBe(false);

        seen.add(value);
      }
    });

    it('does not have duplicate dark values across elevations', () => {
      const seen = new Set<string>();

      for (const key of elevations) {
        const value = surfacePalette[key as keyof typeof surfacePalette]?.dark;

        expect(value, `Missing dark value for ${key}`).toBeDefined();

        expect(seen.has(value), `Duplicate dark value detected: ${value}`).toBe(false);

        seen.add(value);
      }
    });
  });

  // -----------------------------
  // 3. INTENT TOKENS
  // -----------------------------
  it('generates intent base tokens', () => {
    expect(css).toContain('--primary:');
    expect(css).toContain('--error:');
    expect(css).toContain('--success:');
  });

  it('generates intent tailwind mappings', () => {
    expect(css).toContain('--color-primary: var(--primary)');
    expect(css).toContain('--color-error: var(--error)');
  });

  it('generates state tokens for base intents', () => {
    expect(css).toContain('--primary-hover');
    expect(css).toContain('--primary-active');
    expect(css).toContain('--primary-disabled');
  });

  it('does NOT generate states for container-style keys', () => {
    expect(css).not.toContain('--primary-container-hover');
    expect(css).not.toContain('--error-container-hover');
  });

  // -----------------------------
  // 4. EFFECT TOKENS
  // -----------------------------
  it('generates effect tokens in all layers', () => {
    expect(css).toContain('--shadow-sm:');
    expect(css).toContain('--glow-primary:');
    expect(css).toContain('--focus-ring:');
  });

  it('maps effect tokens to theme variables', () => {
    expect(css).toContain('--shadow-sm: var(--shadow-sm)');
    expect(css).toContain('--glow-primary: var(--glow-primary)');
  });

  // -----------------------------
  // 5. BASE STYLES
  // -----------------------------
  it('injects base body styles', () => {
    expect(css).toContain('body');
    expect(css).toContain('@apply bg-background text-on-surface');
  });

  // -----------------------------
  // 6. CRITICAL REGRESSION GUARD (IMPORTANT)
  // -----------------------------
  it('does not generate elevation-based text tokens', () => {
    expect(css).not.toContain('text-on-low');
    expect(css).not.toContain('text-on-level');
    expect(css).not.toContain('text-on-high');
  });

  it('does not generate invalid theme keys', () => {
    expect(css).not.toContain('--color-lowest: var(--surface-lowest)');
  });

  it('warning states are derived correctly', () => {
    expect(css).toContain('--warning-hover');
    expect(css).toContain('--warning-active');
    expect(css).toContain('--warning-disabled');
  });

  it('warning states are derived correctly', () => {
    const base = resolvedIntentPalette.warning.light;
    const hover = resolvedIntentPalette['warning-hover'].light;
    const active = resolvedIntentPalette['warning-active'].light;
    const disabled = resolvedIntentPalette['warning-disabled'].light;

    expect(hover).not.toBe(base);
    expect(active).not.toBe(base);
    expect(disabled).not.toBe(base);

    expect(hover).not.toBe(active);
  });
});
