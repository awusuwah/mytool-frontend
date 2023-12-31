/**
 * Represents an entire offer. This is the object that is returned from the API when requesting details about an offer.
 */
type Offer = {
  offerID: string;
  state: string;
  lastModified: string;

  accommodation: OfferAccommodation;
  fullAccommodation: OfferFullAccommodation;

  contract: OfferContract;
  documents: OfferDocument[];

  prices: OfferPrice[];
  pricesFrom: string;
  turnovers: OfferTurnover[];

  services: OfferService[];

  supplier: Supplier;
  buyingoffice: ValueLabel;
  purchaser: ValueLabel;
};

type OfferAccommodation = {
  code: string;
  name: string;
  type: ValueLabel;

  country: CodeName;
  region: CodeName;
  place: CodeName;
  newPlaceName: string;

  pax: number;
  rooms: number;
  bedrooms: number;
};

type OfferFullAccommodation = {
  code: string;
  name: string;
  type: "A" | "H";
  brand: string;
  pseudo: boolean;

  country: string;
  region: number;
  place: number;

  pax: number;
  rooms: number;
  bedrooms: number;

  address: {
    firstname: string;
    lastname: string;

    country: string;
    place: string;
    placeName: string;
    zip: string;

    streetAndNumber: string;
    addressline1: string;
    addressline2: string;
  };

  coordinates: {
    latitude: number;
    longitude: number;
  };
};

type OfferContract = {
  type: ValueLabel;
  start: string;
  end: string;
  seasonmodel: ValueLabel;
  calculationClass: ValueLabel;
  gerance: number;
  margin: number;
  length: number;
};

type OfferDocument = {
  id: string;
  state: string;
  type: string;
  subtype: "offer_create" | "offer_send";

  creator: string;
  createdOn: string;
  link: string;

  isPreview: boolean;
  isLSOVersion: boolean;
};

type OfferPrice = {
  season: string;
  currency: string;
  period: number;
  margin: number;

  year: number;
  from: string;
  to: string;

  purchase: DailyWeekly;
  purchaseSmart: DailyWeekly;
  sales: DailyWeekly;
  salesSmart: DailyWeekly;
};

type OfferService = {
  code: string;
  suggestions: string[];

  text: string;
  defaultText: string;
  serviceText: string;
};

type OfferTurnover = {
  category: string;
  year: number;
  days: number;

  purchase: string;
  purchaseNet: string;
  sales: string;
};

type OfferData = {
  countries: CodeName[];
  regions: CodeName[];
  places: CodeName[];

  seasonModels: SeasonModel[];
  calculationClasses: number[];
  BOs: BuyingOffice[];
};

type OfferDataAttributes = {
  attributes: any[];
  rule: "USE-SEASONMODEL" | "USE-SMART-PRICING" | string;
};

type OfferDataPrices = {
  prices: OfferPrice[];
  turnovers: OfferTurnover[];
};

type CreateOfferStructure = {
  country: ValueLabel | string;
  region: ValueLabel | string;
  place: ValueLabel | string;
  newPlace: string;

  accoType: ValueLabel | string;
  accoName: string;
  pax: number | string;
  rooms: number | string;
  bedrooms: number | string;

  // Conditions
  seasonModel: ValueLabel | string;
  startDate: string;
  adminFee: number | string;
  contractType: ValueLabel | string;
  margin: number | string;
  calculationClass: ValueLabel | string;

  // Relations
  owner: SupplierShort | string;
  purchaser: BuyingOffice | string;
  buyingOffice: BuyingOffice | string;

  // Attributes
  role?: "USE-SEASONMODEL" | "USE-SMART-PRICING";
  attributes?: {
    [key: string]: string | number | boolean;
  };
};

type ApiOfferStructure = {
  accommodation: {
    code: string;
    name: string;
    type: string;
    country: string;
    region: string;
    place: string;
    newPlaceName: string;
    pax: number;
    rooms: number;
    bedrooms: number;
  };
  contract: {
    seasonModel: string;
    start: string;
    length: number;
    type: string;
    gerance: number;
    margin: number;
    calculationClass: number;
  };
  supplier: string;
  purchaser: string;
  buyingOffice: string;

  attributes?: any;

  prices?: Price[];
};
