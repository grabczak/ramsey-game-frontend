import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import { TGraph, TEdge } from "src/types";

const URL = {
  DEV: "http://127.0.0.1:5000",
  PROD: "https://ramsey-game-backend-h4ewacgsh9frd9f9.polandcentral-01.azurewebsites.net",
};

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? URL.DEV : URL.PROD,
});

export const play = ({
  graph,
  subcliqueSize,
  // @ts-expect-error For react-query error handling
  // eslint-disable-next-line
  lastEdge,
}: {
  graph: TGraph;
  subcliqueSize: number;
  lastEdge: TEdge;
}) => {
  return new Promise((r) => setTimeout(r, 1000)).then(() =>
    api.post<TEdge>("/play", {
      headers: { "Content-Type": "application/json" },
      data: { graph, target_clique_size: subcliqueSize },
    }),
  );
};

export const queryClient = new QueryClient();
