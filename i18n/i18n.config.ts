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

        servicesCard: {
          title: "Extra Costs & Services",
          titleFees: "Fees",

          labels: {
            other: "Other",

            administrationFees: "Administration Fee",
            handlingFees: "Handling Fees",
            otherFees: "Other Fees",
          },

          editModal: {
            title: "Edit Extra Costs & Services",
          },
        },

        documentsCard: {
          title: "{count} Documents",
          latest: "Latest",

          tooltips: {
            creator: "Creator",
            createdOn: "Created on",
            id: "ID",

            createDocument: "Create a document",
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

          createModal: {
            title: "Create a new Supplier",
            titleName: "Name",
            titleAddress: "Address",
            titleContact: "Contact",
            titleFinance: "Finance",

            supplierEmailAlreadyExists:
              "A supplier with the provided email address already exists. Please select a supplier from the list below or create a new one with the data from the previous page.",

            createSupplier: "Create Supplier",

            toasts: {
              createSupplierError: "Unable to create a new supplier.",
              checkSupplierError: "Unable to fetch existing suppliers with this email address.",
            },
          },
        },

        supplierCard: {
          title: "Contact",

          editModal: {
            title: 'Edit Supplier "{fullname}"',
          },
        },

        supplierAddressForm: {
          title: "Address",
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
        supplierDetail: {
          title: 'Supplier "{fullname}"',
        },
      },
      inputs: {
        email: {
          label: "Email Address",
          validation: {
            required: "Please enter an email address.",
            email: "Please enter a valid email address.",
          },
        },
        password: {
          label: "Password",
          placeholder: "********",
        },
        firstname: {
          label: "Firstname",
          validation: {
            required: "Please enter a firstname.",
            max: "The firstname must be less than {max} characters long.",
          },
        },
        lastname: {
          label: "Lastname",
          validation: {
            required: "Please enter a lastname.",
            max: "The lastname must be less than {max} characters long.",
          },
        },
        fullname: {
          label: "Fullname",
        },
        salutation: {
          label: "Salutation",
          validation: {
            required: "Please select a salutation.",
          },
        },
        supplierCode: {
          label: "Supplier Code",
        },
        country: {
          label: "Country",
          validation: {
            required: "Please select a country.",
          },
        },
        address: {
          label: "Address",
        },
        languages: {
          label: "Language|Languages",
          validation: {
            required: "Please select a language.",
          },
        },
        phone: {
          label: "Phone",
          validation: {
            required: "Please enter a phone number.",
          },
        },
        countryOfAccommodation: {
          label: "Country of Accommodation",
          validation: {
            required: "Please select a country of accommodation.",
          },
        },
        companyType: {
          label: "Company Type",
        },
        streetAndNumber: {
          label: "Street & Nr.",
          validation: {
            required: "Please enter a street and number.",
            max: "The street and number must be less than {max} characters long.",
          },
        },
        zip: {
          label: "Zip",
          validation: {
            required: "Please enter a zip.",
          },
        },
        place: {
          label: "Place",
          validation: {
            required: "Please enter a place.",
            max: "The place must be less than {max} characters long.",
          },
        },
        paymentPeriod: {
          label: "Payment Period",
          validation: {
            required: "Please select a payment period.",
          },
        },
        roles: {
          label: "Roles",
        },
        actions: {
          label: "Actions",
        },
      },
      buttons: {
        cancel: "Cancel",
        save: "Save Changes",
      },
      general: {
        salutations: {
          "0001": "Mr.",
          "0002": "Mrs.",
          "0003": "Mr. & Mrs.",
          "0004": "Company",
          "0005": "Undefined",
        },
        language: {
          ca: "Catalan",
          cs: "Czech",
          da: "Danish",
          de: "German",
          en: "English",
          es: "Spanish",
          fi: "Finnish",
          fr: "French",
          hr: "Croatian",
          hu: "Hungarian",
          it: "Italian",
          nl: "Dutch",
          no: "Norwegian",
          pl: "Polish",
          pt: "Portuguese",
          ru: "Russian",
          sv: "Swedish",
          tr: "Turkish",
        },
        paymentPeriod: {
          monthly: "Monthly",
          quarterly: "Quarterly",
          halfYearly: "Half-Yearly",
          twoWeeksBefore: "Two Weeks Before",
          fourWeeksBefore: "Four Weeks Before",
          immediately: "Immediately",
        },
        offer: {
          status: {
            accepted: "Accepted",
            rejected: "Rejected",
            pending: "Pending",
            sent: "Sent",
            active: "Active",
            contract: "Contract",
          },
        },
        badges: {
          pseudo: "Pseudo",
          new: "New",
        },
      },
    },
  },
};
