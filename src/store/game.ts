import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TGameState, TGraph, TTeam } from "src/types";
import { clamp, getMinSubcliqueSize, getMaxSubcliqueSize } from "src/utils";

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
  subcliqueSize: 3,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGraphSize: (state, action: PayloadAction<{ graphSize: number }>) => {
      const { graphSize } = action.payload;
      const minSubcliqueSize = getMinSubcliqueSize(graphSize);
      const maxSubcliqueSize = getMaxSubcliqueSize(graphSize);

      state.graph = createGraph(graphSize);
      state.subcliqueSize = clamp(
        state.subcliqueSize,
        minSubcliqueSize,
        maxSubcliqueSize,
      );
    },
    setSubcliqueSize: (
      state,
      action: PayloadAction<{ subcliqueSize: number }>,
    ) => {
      state.subcliqueSize = action.payload.subcliqueSize;
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

export const { setGraphSize, setSubcliqueSize, setEdgeTeam } =
  gameSlice.actions;

export default gameSlice.reducer;
