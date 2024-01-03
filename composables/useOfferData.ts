import { useAuthStore } from "~/stores/auth";

/**
 * Fetch the data for offer creation from the API.
 *
 * @returns Returns the data for the offer creation.
 */
export default async function useOfferData(): Promise<OfferData | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferData = useRequestFetch();

  try {
    const response: OfferData = await fetchOfferData("/api/offerdata", {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
