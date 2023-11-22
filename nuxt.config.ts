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

  modules: ["@pinia/nuxt"],
});
