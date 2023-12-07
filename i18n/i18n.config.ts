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

          toasts: {
            success: "User '{username}' signed in successfully!",
            error: "An error occured while logging you in!",
          },
        },

        navigation: {
          contextMenu: {
            options: {
              settings: "User & Settings",
              login: "Developer Login",
              logout: "Logout",
            },

            loggedInAs: "Logged in as",

            toasts: {
              logoutSuccess: "You have been logged out!",
            },
          },
        },

        accommodationTable: {
          createAccommodation: "Create Accommodation",
          noAccommodationsFound: "No accommodations found!",

          table: {
            accoName: "Accommodation Name",
            country: "Country",
            region: "Region",
            streetAndNr: "Street & Nr.",
            zipAndPlace: "Zip & Place",
            actions: "Actions",
          },
        },

        offerTable: {
          createOffer: "Create Offer",
          noOffersFound: "No offers found!",

          table: {
            supplier: "Supplier",
            accommodation: "Accommodation",
            internalName: "Internal Name",
            place: "Place",
            contractYears: "Contract Years",
            contractDate: "Contract Date",
            sendDate: "Send Date",
            document: "Document",
            actions: "Actions",
          },

          tooltips: {
            createDocument: "Create Document",
            viewDocument: "View Document",
          },
        },

        supplierTable: {
          createSupplier: "Create Supplier",
          noSuppliersFound: "No suppliers found!",

          table: {
            fullname: "Full Name",
            streetAndNr: "Street & Nr.",
            zipAndPlace: "Zip & Place",
            country: "Country",
            email: "E-Mail",
            roles: "Roles",
            actions: "Actions",
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
          title: "Developer Login",
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
