import { useAuthStore } from "~/stores/auth";

let cache = new Map();

/**
 * Fetch the list of suppliers from the API with the given parameters.
 *
 * @param { SupplierListRequestParams } params - The parameters to use for the request.
 * @returns Returns the list of suppliers.
 */
export default async function useSupplierList(params: SupplierListRequestParams = {}): Promise<SupplierListResponse | undefined> {
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const fetchSupplierList = useRequestFetch();

  try {
    const response: SupplierListResponse = await fetchSupplierList("/api/suppliers", {
      params,
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });

    return response.slice(0, 100);
  } catch (error: any) {
    if (error.name !== "AbortError") {
      $toast.error(error.message);
    }
  }
}

type SupplierListRequestParams = {
  brand?: string;
  suppliercountry?: string;
  email?: string;
};
