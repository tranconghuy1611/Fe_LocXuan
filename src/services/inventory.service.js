import api from "./api";

export const getInventory = () => {
  return api.get("/shop/inventory");
};
