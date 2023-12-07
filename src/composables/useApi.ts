import axios from "axios";

export default function useApi() {
  const { $config } = useNuxtApp();

  const api = axios.create({
    baseURL: `${$config.public.apiBaseUrl}/webcc-api/v1/easy2use`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // You can also add interceptors or other configurations here

  return api;
}
