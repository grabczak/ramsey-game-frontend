import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { play } from "src/api";
import { CircleNode } from "src/components";
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
      <div className="absolute z-50 w-full flex justify-between items-center index-50">
        <div className="flex-1 flex justify-start">
          <Link to="/">
            <button className="m-4 px-3 py-1 font-mono text-xs text-black react-flow__controls">
              &larr; Go back
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <button className="m-4 px-3 py-2 font-mono text-xs text-black react-flow__controls">
            Restart
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          <Controls
            orientation="horizontal"
            showInteractive={false}
            fitViewOptions={{ padding: 0.5 }}
            className="relative m-4"
          />
        </div>
      </div>
      {winner !== "none" && (
        <div className="absolute z-50 bottom-0 left-0 right-0 w-fit ms-auto me-auto">
          <div className="m-4 px-3 py-1 font-mono text-black text-xl shadow-md">
            Winner:{" "}
            <span
              className={`capitalize font-bold ${winner === "browser" ? "text-blue-500" : "text-red-500"}`}
            >
              {winner}
            </span>
          </div>
        </div>
      )}
    </ReactFlow>
  );
}
