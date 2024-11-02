import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { play } from "src/api";
import { CircleNode } from "src/components";
import { useAppSelector, useAppDispatch, setEdgeTeam } from "src/store";
import { createFlowEdges, createFlowNodes } from "src/utils";

export function Graph() {
  const graph = useAppSelector((state) => state.game.graph);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: play,
    onSuccess: ({ data: edge }) => {
      dispatch(setEdgeTeam({ edgeId: edge.id, team: "server" }));
    },
    onError: (_, { lastEdge }) => {
      dispatch(setEdgeTeam({ edgeId: lastEdge.id, team: "none" }));
    },
  });

  const nodes = useMemo(() => createFlowNodes(graph.nodes), [graph.nodes]);

  const edges = useMemo(
    () => createFlowEdges(graph.edges, isPending),
    [graph.edges, isPending],
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
        if (isPending || edge.team !== "none") {
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
      <Link to="/">
        <button className="m-[15px] px-3 py-1 font-mono absolute text-xs text-black z-50 react-flow__controls">
          &larr; Go back
        </button>
      </Link>
      <Controls
        position="top-right"
        orientation="horizontal"
        showInteractive={false}
        fitViewOptions={{ padding: 0.5 }}
      />
    </ReactFlow>
  );
}
