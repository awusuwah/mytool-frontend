/**
 * Fetch the turnovers for the offer from the API.
 *
 * @param { ApiOfferStructure } offer - The offer with the turnovers to be recalculated.
 * @returns Returns the updated list of turnovers.
 */
export default async function useOfferDataTurnovers(offer: ApiOfferStructure): Promise<Turnover[] | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchOfferData = useRequestFetch();

  try {
    const response: Turnover[] = await fetchOfferData("/api/offerdata/turnover", {
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
