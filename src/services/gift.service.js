import api from "./api";

export const sendGift = async (payload) => {
  const res = await api.post("/gifts/send", payload);
  return res.data; // GiftResponse
};
