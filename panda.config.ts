import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
const globalCss = defineGlobalStyles({
  body: {
    color: "#555",
    lineHeight: "1.2",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    boxSizing: "border-box",
  },
});
export default defineConfig({
  staticCss: {
    recipes: {
      button: ["*"],
    },
  },
  // Whether to use css reset
  preflight: true,
  globalCss,
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        success: { value: "#EB8282" },
        successHover: { value: "#ed9797ff" },
        danger: { value: "#ef4444" },
        dangerHover: { value: "#dc2626" },
        neutral: { value: "#6b7280" },
        neutralHover: { value: "#4b5563" },
        white: { value: "#fff" },
        transparent: { value: "transparent" },
      },
      radii: {
        sm: { value: "6px" },
        md: { value: "8px" },
        lg: { value: "14px" },
      },
      fontSizes: {
        xs: { value: "12px" },
        sm: { value: "14px" },
        md: { value: "16px" },
        lg: { value: "20px" },
        xl: { value: "24px" },
        h1: { value: "30px" },
        month: { value: "32px" },
      },
    },
    extend: {
      recipes: {
        button: {
          base: {
            fontSize: "sm",
            borderRadius: "sm",
            fontWeight: "bold",
            px: "14",
            py: "7",
            minWidth: "70px",
            _hover: {
              cursor: "pointer",
            },
          },
          variants: {
            variant: {
              successFilled: {
                bg: "{colors.success}",
                color: "{colors.white}",
                _hover: { bg: "{colors.successHover}" },
              },
              successText: {
                bg: "transparent",
                color: "{colors.success}",
                _hover: { color: "{colors.successHover}" },
              },
              dangerFilled: {
                bg: "{colors.danger}",
                color: "{colors.white}",
                _hover: { bg: "{colors.dangerHover}" },
              },
              dangerText: {
                bg: "transparent",
                color: "{colors.danger}",
                _hover: { color: "{colors.dangerHover}" },
              },
              neutralFilled: {
                bg: "{colors.neutral}",
                color: "{colors.white}",
                _hover: { bg: "{colors.neutralHover}" },
              },
              neutralText: {
                bg: "transparent",
                color: "{colors.neutral}",
                _hover: { color: "{colors.neutralHover}" },
              },
            },
          },

          defaultVariants: {
            variant: "successFilled",
          },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: "styled-system",
});
