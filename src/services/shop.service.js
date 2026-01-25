// services/shop.service.js
import api from "./api";

export const getShopItems = (params) =>
  api.get("/shop/items", { params });
export const createShopItem = (data) =>
  api.post("/shop/admin/items", data);

export const updateShopItem = (id, data) =>
  api.put(`/shop/admin/items/${id}`, data);

export const disableShopItem = (id) =>
  api.delete(`/shop/admin/items/${id}`);
export const buyShopItem = (itemId) =>
  api.post("/shop/buy", { itemId });
