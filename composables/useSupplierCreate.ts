import { useAuthStore } from "~/stores/auth";
import { useDataStore } from "~/stores/active";

/**
 * Create a new supplier in the API.
 *
 * @param { Object } supplier - The supplier to create.
 * @returns Returns the created supplier.
 */
export default async function useSupplierCreate(supplier: any): Promise<Supplier | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const dataStore = useDataStore();
  const fetchSupplierCreate = useRequestFetch();

  try {
    const response: Supplier = await fetchSupplierCreate(`/api/suppliers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
      body: JSON.stringify(supplier),
    });

    return response;
  } catch (error: any) {
    $toast.error(error.message);
  }
}
