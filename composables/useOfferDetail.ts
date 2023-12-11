import { useAuthStore } from "~/stores/auth";
import { useDataStore } from "~/stores/active";

/**
 * Fetch the details of a specific offer from the API.
 *
 * @param { string } id - The ID of the offer to fetch.
 * @returns Returns the details of the offer.
 */
export default async function useOfferDetail(id: string): Promise<Offer | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const dataStore = useDataStore();
  const fetchOfferDetail = useRequestFetch();

  try {
    const response: Offer = await fetchOfferDetail(`/api/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    // Add the end date to the offer contract
    response.contract.end = response.prices[response.prices.length - 1].to;

    // Store the response in the store.
    dataStore.setActiveOffer(response);

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
