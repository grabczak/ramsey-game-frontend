import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TGameState, TGraph, TTeam } from "src/types";
import { clamp, getMinSubcliqueSize, getMaxSubcliqueSize } from "src/utils";

const createGraph = (n: number): TGraph => {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: String(i) }));

  const edges = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const sourceIndex = nodes[i].id;
      const targetIndex = nodes[j].id;

      edges.push({
        id: `${sourceIndex}-${targetIndex}`,
        source: sourceIndex,
        target: targetIndex,
        team: "none" as const,
      });
    }
  }

  return { nodes, edges };
};

const initialState: TGameState = {
  graph: createGraph(6),
  subcliqueSize: 3,
  winner: "none",
  winningSubclique: createGraph(0),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGraphSize: (state, action: PayloadAction<{ graphSize: number }>) => {
      const { graphSize } = action.payload;
      const minSubcliqueSize = getMinSubcliqueSize();
      const maxSubcliqueSize = getMaxSubcliqueSize(graphSize);

      state.graph = createGraph(graphSize);
      state.subcliqueSize = clamp(
        state.subcliqueSize,
        minSubcliqueSize,
        maxSubcliqueSize,
      );
      state.winner = "none";
      state.winningSubclique = createGraph(0);
    },
    setSubcliqueSize: (
      state,
      action: PayloadAction<{ subcliqueSize: number }>,
    ) => {
      state.graph = createGraph(state.graph.nodes.length);
      state.subcliqueSize = action.payload.subcliqueSize;
      state.winner = "none";
      state.winningSubclique = createGraph(0);
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
    setWinner: (state, action: PayloadAction<{ winner: TTeam }>) => {
      state.winner = action.payload.winner;
    },
    setWinningSubclique: (
      state,
      action: PayloadAction<{ winningSubclique: TGraph }>,
    ) => {
      state.winningSubclique = action.payload.winningSubclique;
    },
    restartGame: (state) => {
      state.graph = createGraph(state.graph.nodes.length);
      state.winner = "none";
      state.winningSubclique = createGraph(0);
    },
  },
});

export const {
  setGraphSize,
  setSubcliqueSize,
  setEdgeTeam,
  setWinner,
  setWinningSubclique,
  restartGame,
} = gameSlice.actions;

export default gameSlice.reducer;
