export default {
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

  supplierSelectModal: {
    modal: {
      title: "Select an Owner",

      buttons: {
        back: "Back",
        createSupplier: "Create a new supplier",
      },

      toast: {
        fetchOwnersError: "An error occured while fetching the owners.",
      },
    },
  },

  selectPurchaser: {
    modal: {
      title: "Select a Purchaser",

      table: {
        purchaser: "Purchaser",
        name: "Name",
      },
    },
  },

  selectBuyingOffice: {
    modal: {
      title: "Select a Buying Office",

      table: {
        buyingOffice: "Buying Office",
        name: "Name",
      },
    },
  },

  // components/_offer/creation/AttributesForm.vue
  attributesForm: {
    title: "Attributes",
    titleSmartPricing: "Attributes for Smart Pricing",
    titleSeasonModelPricing: "Attributes for Season Model",

    buttons: {
      continueToPrices: "Continue to Prices",
    },
  },

  // components/_offer/priceMatrix/PriceMatrix.vue
  // components/_offer/priceMatrix/PriceMatrixTable.vue
  // components/_offer/priceMatrix/PriceMatrixTableRow.vue
  priceMatrix: {
    title: "Price Matrix",

    table: {
      duration: "Period from/to",
      season: "Season",
      margin: "Margin",
      purchaseSmart: "Purchase Smart",
      purchaseRent: "Purchase",
      purchaseRentWeekly: "Purchase (weekly)",
      salesSmart: "Sales Smart",
      salesRent: "Sales",
      salesRentWeekly: "Sales (weekly)",

      tooltips: {
        smart: "Result of smart pricing or standard calculation.",
        year: "Fiscal Year {year}",
      },

      toolbar: {
        selectedYear: {
          label: "Selected Year",
        },
      },

      toasts: {
        updatePriceError: "Unable to recalculate the price.",
        updatePricesError: "Unable to recalculate the prices.",
      },

      multiModify: {
        title: "Modify {count} prices",
        apply: "Apply",
      },
    },

    turnover: {
      title: "Potential Turnover for {year}",

      table: {
        days: "Days",
        potentialTurnover: "Potential Turnover",
        potentialTurnoverNet: "Potential Turnover Net",
        turnover: "Turnover",

        purchase: "Purchase",
        sales: "Sales",

        buttons: {
          refresh: "Refresh",
          refreshTooltip:
            "In case suggested prices of Smart Pricing have been changed, the turnover can be recalculated. Important: The 'new' potential turnover might differ from our estimation with optimized pricing.",
        },

        tooltips: {
          potentialTurnoverNet: "Potential turnover purchase minus administration fee",

          justHighseason: "",
          standard: "",
          top25: "",
        },
      },

      toasts: {
        refreshTurnoverError: "Unable to refresh the turnover.",
      },
    },
  },
};
