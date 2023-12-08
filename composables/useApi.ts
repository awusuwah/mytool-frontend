import axios from "axios";

export default function useApi() {
  const { $config } = useNuxtApp();

  const api = axios.create({
    baseURL: `${$config.public.apiBaseUrl}/webcc-api/v1/easy2use`,
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  // You can also add interceptors or other configurations here
  api.interceptors.request.use((config) => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  });

  return api;
}
