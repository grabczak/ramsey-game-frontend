export type TNode = {
  id: string;
};

export type TTeam = "browser" | "server" | "none";

export type TEdge = {
  id: string;
  source: string;
  target: string;
  team: TTeam;
};

export type TGraph = {
  nodes: TNode[];
  edges: TEdge[];
};

export type TGameState = {
  graph: TGraph;
  subcliqueSize: number;
  winner: TTeam;
  winningSubclique: TGraph;
};

export type TPlayResponse = {
  edge: TEdge;
  winner: TTeam;
  clique: "none" | TEdge[];
};
