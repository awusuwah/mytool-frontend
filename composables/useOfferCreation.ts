/**
 * Allow the usage of offer creation utility function in the application.
 */
export default function useOfferCreation() {
  /**
   * Convert the creating offer into a format that can be used by the API.
   *
   * @param { CreateOfferStructure } creatingOffer - The offer which should be converted.
   */
  const convertCreatingOfferToApiFormat = (creatingOffer: CreateOfferStructure): ApiOfferStructure => {
    const { formatDate } = useDateUtils();

    return {
      accommodation: {
        code: "",
        name: creatingOffer.accoName,
        type: (creatingOffer.accoType as ValueLabel)?.value,
        country: (creatingOffer.country as ValueLabel)?.value.toUpperCase(),
        region: (creatingOffer.region as ValueLabel)?.value,
        place: (creatingOffer.place as ValueLabel)?.value,
        newPlaceName: creatingOffer.newPlace,
        pax: Number(creatingOffer.pax),
        rooms: Number(creatingOffer.rooms),
        bedrooms: Number(creatingOffer.bedrooms),
      },
      contract: {
        seasonModel: (creatingOffer.seasonModel as ValueLabel)?.value,
        start: formatDate(creatingOffer.startDate, "yyyy-MM-dd"),
        length: 1, // TODO: Implement the length of a contract
        type: (creatingOffer.contractType as ValueLabel)?.value,
        gerance: Number(creatingOffer.adminFee),
        margin: Number(creatingOffer.margin),
        calculationClass: Number((creatingOffer.calculationClass as ValueLabel)?.value),
      },
      supplier: (creatingOffer.owner as SupplierShort)?.id,
      purchaser: (creatingOffer.purchaser as BuyingOffice)?.code,
      buyingOffice: (creatingOffer.buyingOffice as BuyingOffice)?.code,
    };
  };

  /**
   * Convert a single price entry into a format that can be used by the API.
   *
   * @param { Price } price - The price which should be converted.
   * @param { String } priceValue - The price value which has been updated.
   * @param { String } priceType - The type of the price which has been updated. (daily or weekly)
   * @param { String } rentType - The type of rent that is being paid. (purchase or sales)
   */
  const convertPriceToApiFormat = (price: Price, priceValue: string, priceType: string, rentType: string): OfferDataPriceUpdateRequest => {
    const { purchase, sales, margin, ...rest } = price;

    return {
      ...rest,
      margin: parseFloat(margin.toString()),
      [rentType]: {
        [priceType]: parseFloat(parseFloat(priceValue).toFixed(2)),
      },
    };
  };

  return {
    convertCreatingOfferToApiFormat,
    convertPriceToApiFormat,
  };
}
