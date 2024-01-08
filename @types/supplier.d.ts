/**
 * Represents an entire supplier. This is the object that is returned from the API when requesting details about a supplier.
 */
type Supplier = {
  id: string;
  number: number;
  brand: string;
  isPseudo: boolean;

  country: string;
  address: SupplierAddress;
  coordinates: {
    lat: number;
    lng: number;
  };

  emails: SupplierContact[];
  phoneNumbers: SupplierContact[];
  languages: string[];

  buyingOffice: number;

  arrivalTime: string;
  keyObject: boolean;
  legal: number;
  paymentPeriod: string;
  proprietorStatus: number;
  taxnumber: string;
};

type SupplierAddress = {
  firstname: string;
  lastname: string;
  salutation: string;

  country: string;
  place: string;
  streetAndNumber: string;
  zip: string;
};

type SupplierContact = {
  type: string;
  country: string;
  data: string;
  main: boolean;
};

type CreateSupplierStructure = {
  countryOfAccommodation: ValueLabel | string;
  companyType: string;

  salutation: string;
  firstname: string;
  lastname: string;

  streetAndNumber: string;
  zip: string;
  place: string;
  country: string | ValueLabel;

  email: string;
  phone: any;
  language: string | ValueLabel;

  paymentPeriod: string | ValueLabel;
};

type FilterSupplierStructure = {
  supplierNumber: string;
  email: string;
  firstname: string;
  lastname: string;
};
