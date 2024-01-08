import { useAuthStore } from "~/stores/auth";

/**
 * Fetch the data for offer creation from the API.
 *
 * @returns Returns the data for the offer creation.
 */
export default async function useOfferData(params?: any): Promise<OfferData | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferData = useRequestFetch();

  try {
    let URL = "/api/offerdata";

    // If there are params, add them to the URL only if they are not empty
    if (params) {
      URL += "?";

      for (const key in params) {
        if (params[key]) {
          URL += `${key}=${params[key]}&`;
        }
      }

      // remove the last "&" or "?" when no params are found
      URL = URL.slice(0, -1);
    }

    const response: OfferData = await fetchOfferData(URL, {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
