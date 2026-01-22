// services/wallet.service.js
import api from "./api";

export const getWalletTransactions = () => {
  return api.get("/wallet/transactions");
};
