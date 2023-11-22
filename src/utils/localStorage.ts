import { useThemeStore } from "~/stores/theme";

/**
 * Copy all the data from the localStorage to the pinia store so that all the values are easily accessible
 * from the store. This method needs to be run on the client side.
 */
export const syncLocalStorage = () => {
  const themeStore = useThemeStore();

  // Theme Store
  const theme = window.localStorage.getItem("theme") || "";
  themeStore.setTheme(theme);
};
