// services/wallet.service.js
import api from "./api";

/**
 * Lấy danh sách giao dịch với phân trang
 * @param {number} page - Số trang (bắt đầu từ 0)
 * @param {number} size - Số lượng items mỗi trang
 * @returns {Promise} Response data
 */
export const getWalletTransactions = async (page = 0, size = 10) => {
  const res = await api.get("/wallet/transactions", {
    params: { page, size }
  });
  return res.data.data; // Trả về object pagination { content, totalPages, totalElements, ... }
};

/**
 * Lấy chi tiết 1 giao dịch
 * @param {number} id - ID giao dịch
 * @returns {Promise} Transaction object
 */
export const getWalletTransactionById = async (id) => {
  const res = await api.get(`/wallet/transactions/${id}`);
  return res.data.data; // Trả về object transaction
};