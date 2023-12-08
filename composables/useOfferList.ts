import { useAuthStore } from "~/stores/auth";

/**
 * Fetch the list of offers from the API with the given parameters.
 *
 * @returns Returns the list of offers.
 */
export default async function useOfferList(params: OfferListRequestParams = {}): Promise<OfferListResponse | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferList = useRequestFetch();

  try {
    const response: OfferListResponse = await fetchOfferList("/api/offers", {
      params,
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}

type OfferListRequestParams = {
  bo?: string;
};
