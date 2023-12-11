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

        accommodationCard: {
          title: "Accommodation",

          labels: {
            internalName: "Internal Name",
            accoCode: "Accommodation Code",
            accoType: "Accommodation Type",

            location: "Location",
            postalAddress: "Postal Address",

            pax: "Pax",
            rooms: "Rooms",
            bedrooms: "Bedrooms",
          },

          editModal: {
            title: 'Edit Accommodation "{internalName}"',
          },
        },

        conditionsCard: {
          title: "Conditions",

          labels: {
            contractYears: "Contract Years",
            contractType: "Contract Type",

            startDate: "Start Date",
            endDate: "End Date",

            seasonModel: "Season Model",
            calculationClass: "Calculation Class",
          },
        },

        relationsCard: {
          title: "Relations",

          labels: {
            supplier: "Supplier",
            purchaser: "Purchaser",
            buyingOffice: "Buying Office",
          },

          editModal: {
            title: "Edit Relations",
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
        offerDetail: {
          title: "Offer for {internalName}",
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
      buttons: {
        cancel: "Cancel",
        save: "Save Changes",
      },
    },
  },
};
