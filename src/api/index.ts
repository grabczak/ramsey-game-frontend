import axios from "axios";

import { TGraph, TEdge } from "src/types";

const URL = {
  DEV: "http://127.0.0.1:5000",
  PROD: "https://ramsey-game-backend-h4ewacgsh9frd9f9.polandcentral-01.azurewebsites.net",
};

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? URL.DEV : URL.PROD,
});

export const play = (graph: TGraph) => {
  return api.post<TEdge>("/play", {
    headers: { "Content-Type": "application/json" },
    data: { graph },
  });
};
