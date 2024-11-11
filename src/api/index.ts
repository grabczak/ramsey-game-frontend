import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import { TGraph, TEdge, TPlayResponse } from "src/types";

export const queryClient = new QueryClient();

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
  latestEdge,
}: {
  graph: TGraph;
  subcliqueSize: number;
  latestEdge: TEdge;
}) => {
  const _graph = {
    ...graph,
    edges: graph.edges.map((e) =>
      e.id === latestEdge.id ? { ...e, team: "browser" as const } : e,
    ),
  };

  return api.post<TPlayResponse>("/play", {
    data: {
      graph: _graph,
      target_clique_size: subcliqueSize,
    },
  });
};
