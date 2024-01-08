/**
 * Fetch the data for the prices from the API.
 *
 * @param { ApiOfferStructure } offer - The offer with the prices to be recalculated.
 * @returns Returns the updated list of prices.
 */
export default async function useOfferDataRecalc(offer: any): Promise<OfferDataPriceUpdateResponse | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferData = useRequestFetch();

  try {
    const response: OfferDataPricesResponse = await fetchOfferData("/api/offerdata/recalc", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
      body: JSON.stringify(offer),
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
