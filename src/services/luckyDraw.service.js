import api from "./api";

export const bockLucky = async () => {
  const res = await api.post("/lucky-draw/bock");
  return res.data; // ApiResponse
};
