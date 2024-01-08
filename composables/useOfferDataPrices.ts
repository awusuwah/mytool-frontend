import { useAuthStore } from "~/stores/auth";

/**
 * Fetch the data for the prices from the API.
 *
 * @param { ApiOfferStructure } creatingOffer - The offer which is being created.
 * @returns Returns the list of prices for the provided offer.
 */
export default async function useOfferDataPrices(creatingOffer: ApiOfferStructure): Promise<OfferDataPricesResponse | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferData = useRequestFetch();

  try {
    const response: OfferDataPricesResponse = await fetchOfferData("/api/offerdata/prices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
      body: JSON.stringify(creatingOffer),
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
