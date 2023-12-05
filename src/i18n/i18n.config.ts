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
      },
    },
    dev: {
      components: {
        appSettings: {
          title: "■■■ ■■■■■■■",

          inputs: {
            theme: {
              label: "■■■■■■ ■■■■■",
              options: {
                light: "■■■■■",
                dark: "■■■■",
                coffee: "■■■■■■",
              },
            },
          },
        },
      },
      pages: {
        settings: {
          title: "■■■■■■■■",
        },
      },
    },
  },
};
