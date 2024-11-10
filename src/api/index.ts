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

export const play = async ({
  graph,
  subcliqueSize,
  // @ts-expect-error Error handling with react-query
  // eslint-disable-next-line
  latestEdge,
}: {
  graph: TGraph;
  subcliqueSize: number;
  latestEdge: TEdge;
}) => {
  await new Promise((r) => setTimeout(r, 1000));

  return api.post<TPlayResponse>("/play", {
    data: {
      graph,
      target_clique_size: subcliqueSize,
    },
  });
};
