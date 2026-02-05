// services/profile.service.js
import api from "./api";

/**
 * Lấy thông tin profile của user hiện tại
 * @returns {Promise} User object
 */
export const getMyProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data.data; // ✅ chỉ lấy object user
};

/**
 * Cập nhật profile
 * @param {Object} data - { fullName, favoriteQuote, avatarUrl }
 * @returns {Promise} Updated user object
 */
export const updateMyProfile = async (data) => {
  const res = await api.put("/profile/me", data);
  return res.data.data; // ✅ Trả về user object đã update
};
export const changeOwnPasswordAdmin = async (data) => {
  const res = await api.put("/admin/change-own-password", data);
  return res.data;
};