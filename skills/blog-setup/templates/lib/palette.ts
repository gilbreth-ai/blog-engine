/* ─────────────────────────────────────────────────────────────
   Blog — Blush Editorial Pastel Palette
   ─────────────────────────────────────────────────────────────
   Designed for charts, diagrams, infographics, and data
   visualization on white backgrounds.

   Principles:
   - Anchored on blush pink (#FFB0BC) — warm, feminine primary
   - Pastel saturation — bright and inviting, never dark
   - Enough luminance contrast to pass on white backgrounds
   - Light variants at ~97% luminance for tinted backgrounds
   ────────────────────────────────────────────────────────────── */

export interface PaletteColor {
  /** Human-readable name (used as key in lookups) */
  name: string;
  /** Primary solid color — use for strokes, text accents, and fills */
  solid: string;
  /** Very light tint — use for card backgrounds, tag fills, hover states */
  light: string;
  /** Gradient pair [from, to] — use for filled bars, hero sections, CTAs */
  gradient: [string, string];
}

export interface BlogPalette {
  /** Ordered list of 6 harmonious colors for sequential data series */
  colors: PaletteColor[];
  /** Semantic colors for status-driven UI (callouts, badges, alerts) */
  semantic: {
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    danger: string;
    dangerLight: string;
    info: string;
    infoLight: string;
  };
  /** Neutral grays tuned to the palette's warmth */
  neutral: {
    text: string;
    textSecondary: string;
    border: string;
    divider: string;
    surface: string;
  };
}

export const BLOG_PALETTE: BlogPalette = {
  colors: [
    {
      name: "blush",
      solid: "#FFB0BC",
      light: "#fff8f9",
      gradient: ["#FFC0CA", "#FF98A8"],
    },
    {
      name: "lavender",
      solid: "#C8A8F0",
      light: "#f8f4ff",
      gradient: ["#D8BCF8", "#B890E8"],
    },
    {
      name: "peach",
      solid: "#FFD0A8",
      light: "#fffaf4",
      gradient: ["#FFE0C0", "#FFC090"],
    },
    {
      name: "mint",
      solid: "#88E8B0",
      light: "#f0fdf5",
      gradient: ["#A0F0C0", "#70E0A0"],
    },
    {
      name: "sky",
      solid: "#A0D8F8",
      light: "#f4faff",
      gradient: ["#B8E4FF", "#88CCF0"],
    },
    {
      name: "pink",
      solid: "#FFA8D8",
      light: "#fff5fb",
      gradient: ["#FFB8E0", "#FF98D0"],
    },
  ],

  semantic: {
    success: "#88E8B0",
    successLight: "#f0fdf5",
    warning: "#FFD0A8",
    warningLight: "#fffaf4",
    danger: "#FF98A8",
    dangerLight: "#fff5f6",
    info: "#A0D8F8",
    infoLight: "#f4faff",
  },

  neutral: {
    text: "#1a1a2e",
    textSecondary: "#6b7280",
    border: "#e5e5eb",
    divider: "#f0f0f4",
    surface: "#fafafa",
  },
};

/* ─── Utility helpers ──────────────────────────────────────── */

/** Look up a color by index (wraps), optionally override with a custom hex */
export function getSeriesColor(
  index: number,
  custom?: string
): { solid: string; light: string; gradient: [string, string] } {
  if (custom) {
    return { solid: custom, light: custom, gradient: [custom, custom] };
  }
  return BLOG_PALETTE.colors[index % BLOG_PALETTE.colors.length];
}

/** Get just the solid values as a flat array — handy for Recharts color props */
export function getSeriesSolids(): string[] {
  return BLOG_PALETTE.colors.map((c) => c.solid);
}

/** Get a color by name */
export function getColorByName(name: string): PaletteColor | undefined {
  return BLOG_PALETTE.colors.find((c) => c.name === name);
}
