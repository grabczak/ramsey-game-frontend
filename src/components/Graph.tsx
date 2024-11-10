import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { play } from "src/api";
import { CircleNode, Controls } from "src/components";
import {
  useAppSelector,
  useAppDispatch,
  setEdgeTeam,
  setWinner,
} from "src/store";
import { createFlowEdges, createFlowNodes } from "src/utils";

export function Graph() {
  const graph = useAppSelector((state) => state.game.graph);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

  const winner = useAppSelector((state) => state.game.winner);

  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: play,
    onSuccess: ({ data }) => {
      dispatch(setEdgeTeam({ edgeId: data.edge.id, team: "server" }));
      dispatch(setWinner({ winner: data.winner }));
    },
    onError: (_, { lastEdge }) => {
      dispatch(setEdgeTeam({ edgeId: lastEdge.id, team: "none" }));
    },
  });

  const nodes = useMemo(() => createFlowNodes(graph.nodes), [graph.nodes]);

  const edges = useMemo(
    () => createFlowEdges(graph.edges, isPending || winner !== "none"),
    [graph.edges, isPending, winner],
  );

  const nodeTypes = useMemo(() => ({ circleNode: CircleNode }), []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      nodesDraggable={false}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      fitView
      fitViewOptions={{ padding: 0.5 }}
      onEdgeClick={(_, edge) => {
        if (isPending || edge.team !== "none" || winner !== "none") {
          return;
        }

        dispatch(setEdgeTeam({ edgeId: edge.id, team: "browser" }));

        mutate({
          graph: {
            ...graph,
            edges: graph.edges.map((e) =>
              e.id === edge.id ? { ...e, team: "browser" as const } : e,
            ),
          },
          subcliqueSize,
          lastEdge: edge,
        });
      }}
      style={{ cursor: isPending ? "progress" : "inherit" }}
    >
      <Controls winner={winner} />
    </ReactFlow>
  );
}
