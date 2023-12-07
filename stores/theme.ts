import { defineStore } from "pinia";

/**
 * The store which stores the theme of the application.
 */
export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "",
  }),
  actions: {
    /**
     * Set a specific theme for the application by loading the proper CSS variables.
     *
     * @param { String } theme - The theme which should be activated.
     */
    setTheme(theme: string) {
      this.theme = theme;
      window.localStorage.setItem("theme", theme);
    },
  },
});
