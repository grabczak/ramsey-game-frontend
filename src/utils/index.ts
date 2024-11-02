import { TNode, TEdge } from "src/types";

export const getEdgeCount = (vertexCount: number) => {
  return (vertexCount ** 2 - vertexCount) / 2;
};

export const clamp = (n: number, min: number, max: number) => {
  return Math.min(Math.max(n, min), max);
};

export const getMinSubcliqueSize = () => {
  return 3;
};

export const getMaxSubcliqueSize = (graphSize: number) => {
  const edgeCount = getEdgeCount(graphSize);

  for (let i = 4; i < 10; i++) {
    const iEdgeCount = getEdgeCount(i);

    if (iEdgeCount > edgeCount / 2) {
      return i - 1;
    }
  }

  return 3;
};

export const createFlowNodes = (nodes: TNode[]) => {
  return nodes.map((n, i, a) => ({
    ...n,
    data: { label: n.id },
    position: {
      x: 250 * Math.cos((-2 * Math.PI * i) / a.length + Math.PI / 2) + 250,
      y: -250 * Math.sin((-2 * Math.PI * i) / a.length + Math.PI / 2) + 250,
    },
    type: "circleNode",
    style: { cursor: "not-allowed" },
  }));
};

export const createFlowEdges = (edges: TEdge[], isPending: boolean) => {
  const colors = {
    browser: "rgb(59, 130, 246)",
    server: "rgb(239, 68, 68)",
    none: "rgb(177, 177, 183, 50%)",
  };

  return edges.map((e) => ({
    ...e,
    type: "straight",
    focusable: false,
    style: {
      stroke: colors[e.team],
      strokeWidth: 4,
      pointerEvents:
        isPending || e.team !== "none" ? ("none" as const) : ("auto" as const),
    },
  }));
};
