/**
 * Copy all the data from the localStorage to the pinia store so that all the values are easily accessible
 * from the store. This method needs to be run on the client side.
 */
export const syncLocalStorage = () => {
  const appStore = useAppStore();
  const authStore = useAuthStore();
  const creatingStore = useCreatingStore();
  const themeStore = useThemeStore();

  // App Store
  const sidebarOpen = window.localStorage.getItem("sidebarOpen") === "false" ? false : true;
  appStore.setSidebarOpen(sidebarOpen);

  // Theme Store
  const theme = window.localStorage.getItem("theme") || "";
  themeStore.setTheme(theme);

  // Auth Store
  const accessToken = window.localStorage.getItem("accessToken") || null;
  const user: any = window.localStorage.getItem("user") || null;
  authStore.setAccessToken(accessToken);
  authStore.setUser(JSON.parse(user));

  // Creating Store
  const creatingOffer: any = window.localStorage.getItem("creatingOffer") || null;
  creatingStore.setCreatingOffer(JSON.parse(creatingOffer));
};
