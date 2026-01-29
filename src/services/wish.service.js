// services/wish.service.js
import api from "./api";

export const createWish = (data) => {
  return api.post("/wishes", data);
};

export const getWishByShareToken = (token) => {
  return api.get(`/wishes/share/${token}`);
};

export const getSenderName = (senderId) => {
  return api.get(`/wishes/share/sender/${senderId}`);
};
