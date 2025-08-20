/* eslint-disable */
export type Token = `colors.${ColorToken}` | `radii.${RadiusToken}` | `fontSizes.${FontSizeToken}` | `breakpoints.${BreakpointToken}` | `sizes.${SizeToken}`

export type ColorPalette = "success" | "successHover" | "danger" | "dangerHover" | "neutral" | "neutralHover" | "white" | "transparent"

export type ColorToken = "success" | "successHover" | "danger" | "dangerHover" | "neutral" | "neutralHover" | "white" | "transparent" | "colorPalette"

export type RadiusToken = "sm" | "md" | "lg"

export type FontSizeToken = "xs" | "sm" | "md" | "lg" | "xl" | "h1" | "month"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type Tokens = {
		colors: ColorToken
		radii: RadiusToken
		fontSizes: FontSizeToken
		breakpoints: BreakpointToken
		sizes: SizeToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"