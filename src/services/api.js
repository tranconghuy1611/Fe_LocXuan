// services/api.js
import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const api = axios.create({
  baseURL: "/api",
  // Có thể thêm timeout, headers chung ở đây
});

// Danh sách các endpoint công khai (không cần token)
const publicEndpoints = ["/auth/login", "/auth/register"];

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  const isPublic = publicEndpoints.some((endpoint) =>
    config.url?.startsWith(endpoint)
  );

  if (accessToken && !isPublic) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;