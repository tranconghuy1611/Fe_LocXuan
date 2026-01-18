import api from "./api";

export const checkEmailExact = async (email) => {
  const res = await api.get("/users/check-email", {
    params: { email },
  });

  return res.data.data; 
};
