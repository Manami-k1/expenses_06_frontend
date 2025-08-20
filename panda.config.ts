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
      input: ["*"],
    },
  },
  preflight: true,
  globalCss,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    tokens: {
      colors: {
        success: { value: "#EB8282" },
        successHover: { value: "#e36868ff" },
        edit: { value: "#3B82F6" },
        editHover: { value: "#2563EB" },
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
        xxs: { value: "11px" },
        xs: { value: "12px" },
        sm: { value: "14px" },
        md: { value: "16px" },
        lg: { value: "20px" },
        xl: { value: "24px" },
        h1: { value: "28px" },
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
            p: "7",
            minWidth: "70px",
            flexShrink: 0,
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
              itemDelete: {
                bg: "transparent",
                color: "{colors.danger}",
                p: "7",
                fontSize: "xs",
                minWidth: "0",
                _hover: { color: "{colors.dangerHover}" },
              },
              itemEdit: {
                bg: "transparent",
                color: "{colors.edit}",
                fontSize: "xs",
                p: "7",
                minWidth: "0",
                _hover: { color: "{colors.editHover}" },
              },
            },
          },

          defaultVariants: {
            variant: "successFilled",
          },
        },
        input: {
          base: {
            fontSize: "sm",
            borderRadius: "sm",
            px: "12",
            py: "8",
            bg: "#EEEEEE",
            display: "block",
          },
        },
      },
    },
  },
  outdir: "styled-system",
});
