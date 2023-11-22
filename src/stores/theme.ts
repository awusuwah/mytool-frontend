import { defineStore } from "pinia";

// Variables
const THEMES = ["light", "dark"];

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

    /**
     * Toggle the theme of the application between light and dark.
     */
    toggleTheme() {
      this.setTheme(this.theme === "light" ? "dark" : "light");
    },
  },
});
