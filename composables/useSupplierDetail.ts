import { useAuthStore } from "~/stores/auth";
import { useDataStore } from "~/stores/active";

/**
 * Fetch the details of a specific supplier from the API.
 *
 * @param { string } id - The ID of the supplier to fetch.
 * @returns Returns the details of the supplier.
 */
export default async function useSupplierDetail(id: string): Promise<Supplier | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const dataStore = useDataStore();
  const fetchSupplierDetail = useRequestFetch();

  try {
    const response: Supplier = await fetchSupplierDetail(`/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    // Store the response in the store.
    dataStore.setActiveSupplier(response);

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
