import { useAuthStore } from "~/stores/auth";

/**
 * Fetch the data for offer creation from the API.
 *
 * @returns Returns the data for the offer creation.
 */
export default async function useOfferDataAttributes(creatingOffer: ApiOfferStructure): Promise<OfferDataAttributesResponse | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferData = useRequestFetch();

  try {
    const response: OfferDataAttributesResponse = await fetchOfferData("/api/offerdata/attributes", {
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
