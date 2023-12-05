import { useAppStore } from "~/stores/app";
import { useThemeStore } from "~/stores/theme";

/**
 * Copy all the data from the localStorage to the pinia store so that all the values are easily accessible
 * from the store. This method needs to be run on the client side.
 */
export const syncLocalStorage = () => {
  const appStore = useAppStore();
  const themeStore = useThemeStore();

  // App Store
  const sidebarOpen = window.localStorage.getItem("sidebarOpen") === "false" ? false : true;
  appStore.setSidebarOpen(sidebarOpen);

  // Theme Store
  const theme = window.localStorage.getItem("theme") || "";
  themeStore.setTheme(theme);
};
