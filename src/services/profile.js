import api from "./api";

export const getMyProfile = () => {
  return api.get("/profile/me");
};

export const updateMyProfile = (data) => {
  return api.put("/profile/me", data);
};
