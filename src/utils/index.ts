import { TNode, TEdge, TWinner } from "src/types";

export const clamp = (n: number, min: number, max: number) => {
  return Math.min(Math.max(n, min), max);
};

export const getEdgeCount = (vertexCount: number) => {
  return (vertexCount ** 2 - vertexCount) / 2;
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

  const auto = "auto";
  const none = "none";

  const _edges = edges.map((e) => ({
    ...e,
    type: "straight",
    focusable: false,
    style: {
      stroke: colors[e.team],
      strokeWidth: 4,
      opacity: e.team === "none" ? "50%" : "100%",
      pointerEvents: disabled || e.team !== "none" ? none : auto,
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
