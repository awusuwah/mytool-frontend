type OfferListResponse = OfferShort[];

type OfferShort = {
  id: string;
  status: string;

  accom: CodeLabel;
  supplier: CodeLabel;
  place: CodeLabel;
  country: string;

  link: string;
  creationDate: string;
  sendOutDate: string;
  contractYears: number[];
};

type SupplierListResponse = SupplierShort[];

type SupplierShort = {
  id: string;
  brand: string;
  isPseudo: boolean;

  firstname: string;
  lastname: string;
  email: string;

  country: string;
  address: {
    street: string;
    zip: string;
    place: string;
    country: string;
  };

  roles: string[];
  isKeyholderReady: boolean;
};

type CodeLabel = {
  code: string;
  label: string;
};

type CodeName = {
  code: string;
  name: string;
};

type ValueLabel = {
  value: string;
  label: string;
};

type DailyWeekly = {
  daily: number;
  weekly: number;
};

type SeasonModel = {
  id: string;
  code: number;
  name: string;
  country: number;
  validFrom: string;
  validTo: string;
  years: SeasonModelYear[];
};

type SeasonModelYear = {
  year: number;
  from: string;
  to: string;
};

type BuyingOffice = {
  code: string;
  name: string;
  country: string;
  place: string;
  type: string;
};
