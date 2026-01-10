import api from "./api";

export const getMyProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data.data; // ✅ chỉ lấy object user
};


export const updateMyProfile = (data) => {
  return api.put("/profile/me", data);
};
