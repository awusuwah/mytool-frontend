export default {
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
    loading: "Loading Countries...",
    validation: {
      required: "Please select a country.",
    },
  },
  region: {
    label: "Region",
    loading: "Loading Regions...",
    validation: {
      required: "Please select a region.",
    },
  },
  place: {
    label: "Place",
    loading: "Loading Places...",
    validation: {
      required: "Please enter a place.",
      max: "The place must be less than {max} characters long.",
    },
  },
  newPlace: {
    label: "New Place",
    validation: {
      required: "Please enter a new place.",
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
  accoType: {
    label: "Accommodation Type",
    validation: {
      required: "Please select an accommodation type.",
    },
  },
  accoName: {
    label: "Accommodation Name",
    validation: {
      required: "Please enter an accommodation name.",
    },
  },
  pax: {
    label: "Pax",
    validation: {
      required: "Please select the pax.",
    },
  },
  rooms: {
    label: "Room|Rooms",
    validation: {
      required: "Please select the amount of rooms.",
    },
  },
  bedrooms: {
    label: "Bedroom|Bedrooms",
    validation: {
      required: "Please select the amount of bedrooms.",
    },
  },
  seasonModel: {
    label: "Season Model",
    loading: "Loading Season Models...",
    validation: {
      required: "Please select a season model.",
    },
  },
  startDate: {
    label: "Start Date",
    validation: {
      required: "Please select a start date.",
    },
  },
  adminFee: {
    label: "Administration Fee (in %)",
    validation: {
      min: "Administration Fee must be greater than {min}.",
      max: "Administration Fee must be at most {max}%.",
      integer: "Administration Fee must be a number.",
    },
  },
  contractType: {
    label: "Contract Type",
    validation: {
      required: "Please select a contract type.",
    },
  },
  margin: {
    label: "Margin",
    validation: {
      required: "Please enter a margin.",
    },
  },
  calculationClass: {
    label: "Calculation Class",
    validation: {
      required: "Please select a calculation class.",
    },
  },
  owner: {
    label: "Owner",
    loading: "Loading Owners",
    placeholder: "Select an Owner",

    validation: {
      required: "Please select an owner.",
    },
  },
  purchaser: {
    label: "Purchaser",
    loading: "Loading Purchasers",
    placeholder: "Select a Purchaser",

    validation: {
      required: "Please select a purchaser.",
    },
  },
  buyingOffice: {
    label: "Buying Office",
    loading: "Loading Buying Offices",
    placeholder: "Select a Buying Office",

    validation: {
      required: "Please select a buying office.",
    },
  },
  supplierNumber: {
    label: 'Supplier Number (e.g. "12345")',
  },
};
