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

type CodeLabel = {
  code: string;
  label: string;
};
