import api from "./api";

export const checkEmailExact = async (email) => {
  const res = await api.get("/users/check-email", {
    params: { email },
  });

  return res.data.data; 
};
export const getUsers = (page = 0, size = 10) => {
return api.get("/admin/users", {
params: { page, size },
});
};


// Bật / tắt active user
export const updateUserActive = (id, active) => {
return api.put(`/admin/users/${id}/active`, { active });
};