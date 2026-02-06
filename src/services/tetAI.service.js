import api from "./api";

const TetAIService = {
  ask: async (question) => {
    const res = await api.post("/tet-ai/ask", {
      question,
    });

    return res.data;
  },
};

export default TetAIService;
