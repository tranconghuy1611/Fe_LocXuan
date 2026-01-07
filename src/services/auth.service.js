// services/auth.service.js
import api from "./api"; // Dùng chung instance

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data; // Backend nên trả về { user, accessToken }
};

export const register = async (data) => {
  const { confirmPassword, ...registerData } = data; // Loại bỏ confirmPassword
  const response = await api.post("auth/register", registerData);
  return response.data;
};