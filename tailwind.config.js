/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,vue}"],
  theme: {
    extend: {
      // Load the custom color variables
      colors: {
        // Call to Action
        cta: {
          DEFAULT: "rgb(var(--color-cta) / <alpha-value>)",
          hover: "rgb(var(--color-cta-hover) / <alpha-value>)",
          active: "rgb(var(--color-cta-active) / <alpha-value>)",
          contrast: "rgb(var(--color-cta-contrast) / <alpha-value>)",

          light: {
            DEFAULT: "rgb(var(--color-cta-light) / <alpha-value>)",
            hover: "rgb(var(--color-cta-light-hover) / <alpha-value>)",
            active: "rgb(var(--color-cta-light-active) / <alpha-value>)",
            contrast: "rgb(var(--color-cta-light-contrast) / <alpha-value>)",
          },
        },

        // Theme
        thm: {
          DEFAULT: "rgb(var(--color-thm) / <alpha-value>)",
          hover: "rgb(var(--color-thm-hover) / <alpha-value>)",
          active: "rgb(var(--color-thm-active) / <alpha-value>)",
          contrast: "rgb(var(--color-thm-contrast) / <alpha-value>)",

          light: {
            DEFAULT: "rgb(var(--color-thm-light) / <alpha-value>)",
            hover: "rgb(var(--color-thm-light-hover) / <alpha-value>)",
            active: "rgb(var(--color-thm-light-active) / <alpha-value>)",
            contrast: "rgb(var(--color-thm-light-contrast) / <alpha-value>)",
          },
        },

        // Highlight
        hlt: {
          DEFAULT: "rgb(var(--color-hlt) / <alpha-value>)",
          hover: "rgb(var(--color-hlt-hover) / <alpha-value>)",
          active: "rgb(var(--color-hlt-active) / <alpha-value>)",
          contrast: "rgb(var(--color-hlt-contrast) / <alpha-value>)",

          light: {
            DEFAULT: "rgb(var(--color-hlt-light) / <alpha-value>)",
            hover: "rgb(var(--color-hlt-light-hover) / <alpha-value>)",
            active: "rgb(var(--color-hlt-light-active) / <alpha-value>)",
            contrast: "rgb(var(--color-hlt-light-contrast) / <alpha-value>)",
          },
        },

        // Functional: Success
        suc: {
          DEFAULT: "rgb(var(--color-suc) / <alpha-value>)",
          hover: "rgb(var(--color-suc-hover) / <alpha-value>)",
          active: "rgb(var(--color-suc-active) / <alpha-value>)",
          contrast: "rgb(var(--color-suc-contrast) / <alpha-value>)",
          light: "rgb(var(--color-suc-light) / <alpha-value>)",
          text: "rgb(var(--color-suc-text) / <alpha-value>)",
        },

        // Functional: Danger
        err: {
          DEFAULT: "rgb(var(--color-err) / <alpha-value>)",
          hover: "rgb(var(--color-err-hover) / <alpha-value>)",
          active: "rgb(var(--color-err-active) / <alpha-value>)",
          contrast: "rgb(var(--color-err-contrast) / <alpha-value>)",
          light: "rgb(var(--color-err-light) / <alpha-value>)",
          text: "rgb(var(--color-err-text) / <alpha-value>)",
        },

        // Functional: Warning
        wrn: {
          DEFAULT: "rgb(var(--color-wrn) / <alpha-value>)",
          hover: "rgb(var(--color-wrn-hover) / <alpha-value>)",
          active: "rgb(var(--color-wrn-active) / <alpha-value>)",
          contrast: "rgb(var(--color-wrn-contrast) / <alpha-value>)",
          light: "rgb(var(--color-wrn-light) / <alpha-value>)",
          text: "rgb(var(--color-wrn-text) / <alpha-value>)",
        },

        // Functional: Info
        inf: {
          DEFAULT: "rgb(var(--color-inf) / <alpha-value>)",
          hover: "rgb(var(--color-inf-hover) / <alpha-value>)",
          active: "rgb(var(--color-inf-active) / <alpha-value>)",
          contrast: "rgb(var(--color-inf-contrast) / <alpha-value>)",
          light: "rgb(var(--color-inf-light) / <alpha-value>)",
          text: "rgb(var(--color-inf-text) / <alpha-value>)",
        },

        // Background
        bgr: {
          DEFAULT: "rgb(var(--color-bgr) / <alpha-value>)",
          100: "rgb(var(--color-bgr100) / <alpha-value>)",
          200: "rgb(var(--color-bgr200) / <alpha-value>)",
          300: "rgb(var(--color-bgr300) / <alpha-value>)",
          400: "rgb(var(--color-bgr400) / <alpha-value>)",
          500: "rgb(var(--color-bgr500) / <alpha-value>)",
          600: "rgb(var(--color-bgr600) / <alpha-value>)",
          700: "rgb(var(--color-bgr700) / <alpha-value>)",
          800: "rgb(var(--color-bgr800) / <alpha-value>)",
          900: "rgb(var(--color-bgr900) / <alpha-value>)",
        },

        // Text & Link
        txt: {
          DEFAULT: "rgb(var(--color-txt) / <alpha-value>)",
          100: "rgb(var(--color-txt100) / <alpha-value>)",
          200: "rgb(var(--color-txt200) / <alpha-value>)",
          300: "rgb(var(--color-txt300) / <alpha-value>)",
          400: "rgb(var(--color-txt400) / <alpha-value>)",
          500: "rgb(var(--color-txt500) / <alpha-value>)",
          600: "rgb(var(--color-txt600) / <alpha-value>)",
          700: "rgb(var(--color-txt700) / <alpha-value>)",
          800: "rgb(var(--color-txt800) / <alpha-value>)",
          900: "rgb(var(--color-txt900) / <alpha-value>)",

          link: {
            DEFAULT: "rgb(var(--color-txt-link) / <alpha-value>)",
            hover: "rgb(var(--color-txt-link-hover) / <alpha-value>)",
            active: "rgb(var(--color-txt-link-active) / <alpha-value>)",
            contrast: "rgb(var(--color-txt-link-contrast) / <alpha-value>)",
          },
        },

        // Misc. Colors
        offer: "rgb(var(--color-offer) / <alpha-value>)",
        supplier: "rgb(var(--color-supplier) / <alpha-value>)",
        accommodation: "rgb(var(--color-accommodation) / <alpha-value>)",
      },
    },
  },
  plugins: [],
  safelist: ["bg-thm"],
};
