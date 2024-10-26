import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TGameState, TGraph, TTeam } from "../types";

const createGraph = (n: number): TGraph => {
  const nodes = [];

  for (let i = 0; i < n; i++) {
    nodes.push({
      id: String(i),
    });
  }

  const edges = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push({
        id: `${nodes[i].id}-${nodes[j].id}`,
        source: nodes[i].id,
        target: nodes[j].id,
        team: "none" as const,
      });
    }
  }

  return { nodes, edges };
};

const initialState: TGameState = {
  graph: createGraph(6),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGraphSize: (state, action: PayloadAction<{ graphSize: number }>) => {
      state.graph = createGraph(action.payload.graphSize);
    },
    setEdgeTeam: (
      state,
      action: PayloadAction<{ edgeId: string; team: TTeam }>,
    ) => {
      state.graph.edges.forEach((e) => {
        const { edgeId, team } = action.payload;

        if (e.id === edgeId) {
          e.team = team;
        }
      });
    },
  },
});

export const { setGraphSize, setEdgeTeam } = gameSlice.actions;

export default gameSlice.reducer;
