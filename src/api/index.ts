import axios from "axios";

const URL = {
  DEV: "http://127.0.0.1:5000",
  PROD: "https://ramsey-game-backend-h4ewacgsh9frd9f9.polandcentral-01.azurewebsites.net",
};

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? URL.DEV : URL.PROD,
});

export const play = (nodes: any, edges: any) => {
  return api.post("/play", {
    headers: { "Content-Type": "application/json" },
    data: { graph: { nodes, edges } },
  });
};
