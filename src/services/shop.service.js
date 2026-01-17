// services/shop.service.js
import api from "./api";

export const getShopItems = (params) =>
  api.get("/shop/items", { params });
