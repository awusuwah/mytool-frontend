export default {
  legacy: false,
  locale: "dev",
  messages: {
    en: {
      components: {
        appSettings: {
          title: "App Settings",

          inputs: {
            theme: {
              label: "Toggle Theme",
              options: {
                light: "Light",
                dark: "Dark",
                coffee: "Coffee",
              },
            },
            language: {
              label: "Language",
              options: {
                en: "English",
                dev: "Developer",
              },
            },
          },
        },

        loginForm: {
          title: "Login",
          submit: "Login",
        },

        navigation: {
          contextMenu: {
            options: {
              settings: "User & Settings",
              login: "Login",
              logout: "Logout",
            },

            loggedInAs: "Logged in as",
          },
        },
      },
      pages: {
        settings: {
          title: "Settings",
        },
        dashboard: {
          title: "Dashboard",
        },
        offers: {
          title: "Offers",
        },
        suppliers: {
          title: "Suppliers",
        },
        accommodations: {
          title: "Accommodations",
        },
        login: {
          title: "Login (Developer Only)",
        },
      },
      inputs: {
        email: {
          label: "Email Address",
        },
        password: {
          label: "Password",
          placeholder: "********",
        },
      },
    },
  },
};
