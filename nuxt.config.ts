import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: "src",

  // Alias
  alias: {
    "~": resolve(__dirname, "./src"),
    "@": resolve(__dirname, "./src/components"),
  },

  css: ["~/assets/tailwind.css"],

  // Tailwindcss
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // I18n
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "dev",
    vueI18n: "~/i18n/i18n.config.ts",
  },

  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
});
