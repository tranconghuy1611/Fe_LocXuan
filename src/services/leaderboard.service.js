import api from "./api";

export const getTop10Leaderboard = async () => {
  const res = await api.get("/leaderboard/top10");
  return res.data.data; // List<LeaderboardResponse>
};
