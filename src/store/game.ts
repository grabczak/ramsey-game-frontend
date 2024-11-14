import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { TGameState, TTeam, TEdge, TWinner } from "src/types";
import { clamp, createGraph, getMaxSubcliqueSize } from "src/utils";

const initialState: TGameState = {
  graph: createGraph(6),
  subcliqueSize: 3,
  winner: "none",
  winningEdges: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGraphSize: (state, action: PayloadAction<{ graphSize: number }>) => {
      const { graphSize } = action.payload;
      const minSubcliqueSize = 3;
      const maxSubcliqueSize = getMaxSubcliqueSize(graphSize);

      state.graph = createGraph(graphSize);
      state.subcliqueSize = clamp(
        state.subcliqueSize,
        minSubcliqueSize,
        maxSubcliqueSize,
      );
      state.winner = "none";
      state.winningEdges = [];
    },
    setSubcliqueSize: (
      state,
      action: PayloadAction<{ subcliqueSize: number }>,
    ) => {
      state.graph = createGraph(state.graph.nodes.length);
      state.subcliqueSize = action.payload.subcliqueSize;
      state.winner = "none";
      state.winningEdges = [];
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
    setWinner: (state, action: PayloadAction<{ winner: TWinner }>) => {
      state.winner = action.payload.winner;
    },
    setWinningEdges: (
      state,
      action: PayloadAction<{ winningEdges: TEdge[] }>,
    ) => {
      state.winningEdges = action.payload.winningEdges;
    },
    restartGame: (state) => {
      state.graph = createGraph(state.graph.nodes.length);
      state.winner = "none";
      state.winningEdges = [];
    },
  },
});

export const {
  setGraphSize,
  setSubcliqueSize,
  setEdgeTeam,
  setWinner,
  setWinningEdges,
  restartGame,
} = gameSlice.actions;

export default gameSlice.reducer;
