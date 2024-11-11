export type TTeam = "browser" | "server" | "none";

export type TWinner = TTeam | "draw";

export type TNode = {
  id: string;
};

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
  winner: TWinner;
  winningEdges: TEdge[];
};

export type TPlayResponse =
  | {
      winner: "none";
      edge: TEdge;
      clique: [];
    }
  | {
      winner: "browser";
      edge: null;
      clique: TEdge[];
    }
  | {
      winner: "server";
      edge: TEdge;
      clique: TEdge[];
    }
  | {
      winner: "draw";
      edge: TEdge | null;
      clique: [];
    };
