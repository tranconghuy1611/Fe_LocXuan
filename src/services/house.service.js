import api from "./api";

export const getMyHouse = () => {
  return api.get("/house/me");
};

export const placeItemToHouse = ({ itemId, posX, posY }) => {
  return api.post("/house/place", { itemId, posX, posY });
};

export const updateDecorationPosition = (decorationId, { posX, posY }) => {
  return api.put(`/house/${decorationId}`, { posX, posY });
};

export const removeDecoration = (decorationId) => {
  return api.delete(`/house/${decorationId}`);
};
export const getMyShareToken = () => {
  return api.get("/house/my/share-token");
};

export const getHouseByShareToken = (token) => {
  return api.get(`/house/share/${token}`);
};