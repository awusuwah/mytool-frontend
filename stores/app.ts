import { defineStore } from "pinia";

/**
 * The store which stores the application state. This includes things like the interface language,
 * interface date format, the state of the sidebar navigation, etc.
 */
export const useAppStore = defineStore("app", {
  state: () => ({
    sidebarOpen: true,
    language: "",
  }),
  getters: {
    /**
     * Get if the sidebar is open or not.
     *
     * @returns { Boolean } Returns if the sidebar is open or not.
     */
    getSidebarOpen(): boolean {
      return this.sidebarOpen;
    },

    /**
     * Get the language for the application.
     *
     * @returns { string } Returns the language for the application.
     */
    getLanguage(): string {
      return this.language;
    },
  },
  actions: {
    /**
     * Set the state of the sidebar. This is used to open and close the sidebar.
     *
     * @param { Boolean } open - The `open` state of the sidebar.
     */
    setSidebarOpen(open: boolean) {
      this.sidebarOpen = open;
    },

    /**
     * Set the language for the application. This is used to change the interface language.
     *
     * @param { string } language - The language which should be set.
     */
    setLanguage(language: string) {
      this.language = language;
    },
  },
});
