import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,
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
    defaultLocale: "en",
    vueI18n: "~/i18n/i18n.config.ts",
  },

  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "NO_API_BASE_URL_SET",
      oauthSecret: process.env.OAUTH_CLIENT_SECRET || "NO_SECRET_SET",
    },
  },
});
