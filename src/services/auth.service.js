// services/auth.service.js
import api from "./api";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data.data; // ✅ chỉ trả data
};
export const refresh = async () => {
  const response = await api.post("/auth/refresh");
  return response.data.data; // accessToken mới
};


export const register = async (data) => {
  const { confirmPassword, ...registerData } = data;
  const response = await api.post("/auth/register", registerData);
  return response.data;
};
export const verify = async (data) => {
  const response = await api.post("/auth/verify-email", data);
  return response.data.data; // token + user
};
export const resend = async (data) => {
  const response = await api.post("/auth/resend-code", data);
  return response.data.data;
};