import { useAuthStore } from "~/stores/auth";

/**
 * Fetch the details of a specific offer from the API.
 *
 * @param { string } id - The ID of the offer to fetch.
 * @returns Returns the details of the offer.
 */
export default async function useOfferDetail(id: string): Promise<Offer | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferDetail = useRequestFetch();

  try {
    const response: Offer = await fetchOfferDetail(`/api/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
