import api from "./api";

/**
 * GET /api/horoscope/{category}
 */
export const getTodayHoroscope = (category) => {
  return api.get(`/horoscope/${category}`);
};
