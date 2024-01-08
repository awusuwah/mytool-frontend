/**
 * The response as its returned from the '/api/offerdata/attributes' endpoint.
 */
type OfferDataAttributesResponse = {
  attributes: Attribute[];
  rule: "USE-SEASONMODEL" | "USE-SMART-PRICING";
};

/**
 * The response as its returned from the '/api/offerdata/prices' endpoint.
 */
type OfferDataPricesResponse = {
  prices: Price[];
  turnovers: Turnover[];
};

type OfferDataPriceUpdateRequest = {};

type OfferDataPriceUpdateResponse = {
  prices: Price[];
};
