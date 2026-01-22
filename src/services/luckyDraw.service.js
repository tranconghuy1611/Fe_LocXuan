import api from "./api";

/* ================= USER ================= */

// Bốc lộc
export const bockLucky = async () => {
  const res = await api.post("/lucky-draw/bock");
  return res.data; // ApiResponse<LuckyDrawResponse>
};

/* ================= ADMIN ================= */

// Lấy danh sách lộc (phân trang)
export const getAdminLuckyRewards = async (page = 0, size = 10) => {
  const res = await api.get("/lucky-draw/admin/reward", {
    params: { page, size },
  });
  return res.data; // ApiResponse<Page<LuckyRewardResponse>>
};

// Tạo lộc mới
export const createLuckyReward = async (data) => {
  const res = await api.post("/lucky-draw/admin/reward", data);
  return res.data; // ApiResponse<AdminLuckyRewardResponse>
};

// Cập nhật lộc
export const updateLuckyReward = async (id, data) => {
  const res = await api.put(`/lucky-draw/admin/reward/${id}`, data);
  return res.data; // ApiResponse<AdminLuckyRewardResponse>
};

// Xóa (disable) lộc
export const deleteLuckyReward = async (id) => {
  const res = await api.delete(`/lucky-draw/admin/reward/${id}`);
  return res.data; // ApiResponse<Void>
};
