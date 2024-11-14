import { TNode, TEdge, TWinner, TGraph } from "src/types";

export const clamp = (n: number, min: number, max: number) => {
  return Math.min(Math.max(n, min), max);
};

export const getEdgeCount = (vertexCount: number) => {
  if (vertexCount < 0) {
    return 0;
  }

  const _vertexCount = Math.floor(vertexCount);

  return (_vertexCount ** 2 - _vertexCount) / 2;
};

export const getVertexCount = (edgeCount: number) => {
  if (edgeCount < 0) {
    return 0;
  }

  const _edgeCount = Math.floor(edgeCount);

  return Math.floor((1 + Math.sqrt(1 + 8 * _edgeCount)) / 2);
};

export const getMaxSubcliqueSize = (graphSize: number) => {
  return getVertexCount(getEdgeCount(graphSize) / 2);
};

export const createGraph = (n: number): TGraph => {
  const nodes = Array.from({ length: n }).map((_, i) => ({ id: String(i) }));

  const edges = nodes.flatMap((_, i, a) =>
    Array.from({ length: a.length - i - 1 }).map((_, j) => ({
      id: `${i}-${i + j + 1}`,
      source: `${i}`,
      target: `${i + j + 1}`,
      team: "none" as const,
    })),
  );

  return { nodes, edges };
};

export const createFlowNodes = ({ nodes }: { nodes: TNode[] }) => {
  return nodes.map((n, i, a) => ({
    ...n,
    data: { label: n.id },
    position: {
      x: 250 * Math.cos((-2 * Math.PI * i) / a.length + Math.PI / 2) + 250,
      y: -250 * Math.sin((-2 * Math.PI * i) / a.length + Math.PI / 2) + 250,
    },
    type: "circleNode",
    style: { borderRadius: "100%", cursor: "not-allowed" },
  }));
};

export const createFlowEdges = ({
  edges,
  winner,
  winningEdges,
  disabled,
}: {
  edges: TEdge[];
  winner: TWinner;
  winningEdges: TEdge[];
  disabled: boolean;
}) => {
  const colors = {
    browser: "rgb(59, 130, 246)",
    server: "rgb(239, 68, 68)",
    none: "rgb(177, 177, 183)",
  };

  const _edges = edges.map((e) => ({
    ...e,
    type: "straight",
    focusable: false,
    style: {
      stroke: colors[e.team],
      strokeWidth: 4,
      opacity: e.team === "none" ? "50%" : "100%",
      pointerEvents: disabled || e.team !== "none" ? "none" : "auto",
    },
  }));

  if (winner === "browser" || winner === "server") {
    const winningEdgeIds = winningEdges.map((e) => e.id);

    return _edges.map((e) => ({
      ...e,
      style: {
        ...e.style,
        opacity: winningEdgeIds.includes(e.id) ? "100%" : "35%",
      },
    }));
  }

  if (winner === "draw") {
    return _edges.map((e) => ({
      ...e,
      style: { ...e.style, opacity: "35%" },
    }));
  }

  return _edges;
};
