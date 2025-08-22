const tokens = {
  "colors.success": {
    "value": "#EB8282",
    "variable": "var(--colors-success)"
  },
  "colors.successHover": {
    "value": "#e36868ff",
    "variable": "var(--colors-success-hover)"
  },
  "colors.edit": {
    "value": "#3B82F6",
    "variable": "var(--colors-edit)"
  },
  "colors.editHover": {
    "value": "#2563EB",
    "variable": "var(--colors-edit-hover)"
  },
  "colors.danger": {
    "value": "#ef4444",
    "variable": "var(--colors-danger)"
  },
  "colors.dangerHover": {
    "value": "#dc2626",
    "variable": "var(--colors-danger-hover)"
  },
  "colors.neutral": {
    "value": "#6b7280",
    "variable": "var(--colors-neutral)"
  },
  "colors.neutralHover": {
    "value": "#4b5563",
    "variable": "var(--colors-neutral-hover)"
  },
  "colors.white": {
    "value": "#fff",
    "variable": "var(--colors-white)"
  },
  "colors.transparent": {
    "value": "transparent",
    "variable": "var(--colors-transparent)"
  },
  "radii.sm": {
    "value": "6px",
    "variable": "var(--radii-sm)"
  },
  "radii.md": {
    "value": "8px",
    "variable": "var(--radii-md)"
  },
  "radii.lg": {
    "value": "14px",
    "variable": "var(--radii-lg)"
  },
  "fontSizes.xxs": {
    "value": "11px",
    "variable": "var(--font-sizes-xxs)"
  },
  "fontSizes.xs": {
    "value": "12px",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "14px",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "16px",
    "variable": "var(--font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "20px",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "24px",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.h1": {
    "value": "28px",
    "variable": "var(--font-sizes-h1)"
  },
  "fontSizes.month": {
    "value": "32px",
    "variable": "var(--font-sizes-month)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar